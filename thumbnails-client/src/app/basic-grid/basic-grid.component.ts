import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRowSelectionEventArgs } from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { FileData } from '../models/reveal-dom-dashboards/file-data';
import { RevealDomDashboardsService } from '../services/reveal-dom-dashboards.service';

@Component({
  selector: 'app-basic-grid',
  templateUrl: './basic-grid.component.html',
  styleUrls: ['./basic-grid.component.scss']
})
export class BasicGridComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public dashboardName?: string;
  public revealDomDashboardsFileData: FileData[] = [];

  constructor(
    private revealDomDashboardsService: RevealDomDashboardsService,
  ) {}

  ngOnInit() {
    this.revealDomDashboardsService.getFileDataList(undefined).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.revealDomDashboardsFileData = data,
      error: (_err: any) => this.revealDomDashboardsFileData = []
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public gridRowSelectionChanging(event: IRowSelectionEventArgs) {
    this.dashboardName = event.newSelection[0]?.name as string;
  }
}
