import { Component, OnDestroy, OnInit, } from '@angular/core';
import { ISimpleComboSelectionChangingEventArgs } from '@infragistics/igniteui-angular';
import { Subject, switchMap, take, takeUntil } from 'rxjs';
import { VisualizationNames } from '../models/reveal-dom/visualization-names';
import { FileData } from '../models/reveal-dom/file-data';
import { RevealDomService } from '../services/reveal-dom.service';
import { RdashDocument } from '@revealbi/dom';
import { environment } from 'src/environments/environment';
import { RevealViewOptions, SavedEventArgs } from '@revealbi/ui';

interface VizInfo {
  id: string;
  dashboardId: string;
  name?: string;
  dashboardName: string;
  selected?: boolean;
}

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.scss']
})

export class View1Component implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  _singleViz?: string;
  _singleVizDocument?: string;

  private _dashboardName?: string;
  public get dashboardName(): string | undefined {
    return this._dashboardName;
  }

  public set dashboardName(value: string | undefined) {
    this._dashboardName = value;
    this.revealDomVisualizationNames$.next();
  }

  public dashboardVisualizations?: VisualizationNames;
  public revealDomFileData: FileData[] = [];
  public revealDomVisualizationNames: VisualizationNames[] = [];
  public revealDomVisualizationNames$: Subject<void> = new Subject<void>();

  public visualizationId?: string;
  public visualizationName?: string;
  public visualizationTitle?: string;

  dashboardDocument: RdashDocument | string | null = "";
  availableViz: VizInfo[] = [];
  vizCollection: VizInfo[] = [];
  selectedViz?: VizInfo;

  sourceDocs: Map<string, RdashDocument> = new Map();

  options: RevealViewOptions = {
    canEdit: true,
    canSaveAs: true,
    startInEditMode: true,
    dataSourceDialog:
    {
      showExistingDataSources: true,
    },
    header: {
      menu: {
        exportToExcel: false,
        exportToImage: false,
        exportToPdf: false,
        exportToPowerPoint: false,
        refresh: false,
        items: [
          { title: "Clear / New", click: () => this.resetDashboard(), icon: "https://users.infragistics.com/Reveal/Images/download.png" },
          // { title: "Export Dashboard", click: () => {
          //   console.log("Export Dashboard Clicked!");
          //   // Create a blob
          //  // const blob = rdashDocument.toBlob();
            
          //   // Create an anchor element and set the URL to the blob URL
          //   const a = document.createElement('a');
          //   //a.href = URL.createObjectURL(blob);
          //   //a.download = rdashDocument.title + ".rdash";

          //   // Append the anchor to the body, click it, and then remove it
          //   document.body.appendChild(a);
          //   a.click();
          //   document.body.removeChild(a);

          //   // Optional: Clean up the blob URL
          //   setTimeout(() => URL.revokeObjectURL(a.href), 100);
        // }},
        ]
      }
    }
  }

  constructor(
    private revealDomService: RevealDomService,
  ) { }

  ngOnInit() {
    this.revealDomService.getFileDataList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.revealDomFileData = data,
      error: (_err: any) => this.revealDomFileData = []
    });
    
    this.revealDomService.getVisualizationNamesList(this.dashboardName as any).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.revealDomVisualizationNames = data,
      error: (_err: any) => this.revealDomVisualizationNames = []
    });

    this.revealDomVisualizationNames$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.revealDomService.getVisualizationNamesList(this.dashboardName as any).pipe(take(1)).subscribe({
        next: (data) => this.revealDomVisualizationNames = data,
        error: (_err: any) => this.revealDomVisualizationNames = []
    })});
  
  }

  resetDashboard() {
    this.vizCollection = [];
    this.dashboardDocument = null;
  }

  public onSaving(e: SavedEventArgs) {
    const isInvalidName = (name: string) => {
      return name === "Generated Dashboard" || name === "New Dashboard" || name === "";
    };

    if (e.saveAs || isInvalidName(e.name)) {
      let newName: string | null;

      do {
        newName = prompt("Please enter a valid dashboard name");
        if (newName === null) {
          return;
        }
      } while (isInvalidName(newName));

      this.isDuplicateName(newName).then(isDuplicate => {
        if (isDuplicate === 'true') {
          if (!window.confirm("A dashboard with name: " + newName + " already exists. Do you want to override it?")) {
            return;
          }
        }
        e.dashboardId = e.name = newName!;
        e.saveFinished();
      });
    } else {
      e.saveFinished();
    }
  }

  private isDuplicateName(name: string): Promise<string> {
    return fetch(`${environment.BASE_URL}/isduplicatename/${name}`).then(resp => resp.text());
  }

  private prevSelected: any;

  private handleItemClick(item: VisualizationNames): void {
    if (this.prevSelected) {
      this.prevSelected.selected = false;
    }
      item.selected = true;
      this.prevSelected = item;
      //this.cdr.detectChanges();

    const { id, name, title } = item;
    this.dashboardVisualizations = item;
    this.visualizationId = id;
    this.visualizationName = name;
    this.visualizationTitle = title;

    if (this.dashboardName && name) {
      this.loadDashboardById(this.dashboardName, id);
      this.selectedViz = { id, dashboardId: this.dashboardName, name, dashboardName: this.dashboardName };
      console.log("Viz Info Selected:", this.selectedViz);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.revealDomVisualizationNames$.complete();
  }

  public singleSelectComboSelectionChanging(event: ISimpleComboSelectionChangingEventArgs) {
    this.dashboardName = event.newSelection.name as string;
  }

  public listItemClick(item: VisualizationNames): void {
    this.handleItemClick(item);
  }

  public iconItemClick(item: VisualizationNames): void {
    this.handleItemClick(item);
    if (this.selectedViz) {
      this.vizCollection.push(this.selectedViz);
      this.generateDashboard();
    } else {
      console.error('Selected visualization is undefined');
    }
  }

  private loadDashboardById(dashboardName: string, visualizationId: string) {
    this._singleVizDocument = dashboardName;
    this._singleViz = visualizationId;
  }

  private async generateDashboard(): Promise<void> {
    console.log("Add Generated Dashboard");
    const document = new RdashDocument("Generated Dashboard");
    for (const viz of this.vizCollection) {
      let sourceDoc = this.sourceDocs.get(viz.dashboardId);
      if (!sourceDoc) {
        try {
          sourceDoc = await RdashDocument.load(viz.dashboardId);
          this.sourceDocs.set(viz.dashboardId, sourceDoc);
        } catch (error) {
          console.error(`Failed to load document: ${viz.dashboardId}`, error);
          continue;
        }
      }
      if (sourceDoc) {
        document.import(sourceDoc, viz.id);
        console.log(`Viz Id Added: ${viz.id}`);
      }
    }
    this.dashboardDocument = document;
  }
}
