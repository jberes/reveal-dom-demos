import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISimpleComboSelectionChangingEventArgs } from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { FileData } from '../models/reveal-dom-dashboards/file-data';
import { RevealDomDashboardsService } from '../services/reveal-dom-dashboards.service';

@Component({
  selector: 'app-simple-combo',
  templateUrl: './simple-combo.component.html',
  styleUrls: ['./simple-combo.component.scss']
})
export class SimpleComboComponent implements OnInit, OnDestroy {
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

  public singleSelectComboSelectionChanging(event: ISimpleComboSelectionChangingEventArgs) {
    this.dashboardName = event.newValue as string;
    console.log(this.dashboardName);
  }
}
