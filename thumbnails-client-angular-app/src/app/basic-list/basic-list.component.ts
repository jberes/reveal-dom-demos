import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FileData } from '../models/reveal-dom-dashboards/file-data';
import { RevealDomDashboardsService } from '../services/reveal-dom-dashboards.service';

@Component({
  selector: 'app-basic-list',
  templateUrl: './basic-list.component.html',
  styleUrls: ['./basic-list.component.scss']
})
export class BasicListComponent implements OnInit, OnDestroy {
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

  public listItemClick(item: FileData) {
    this.dashboardName = item.name as string;
  }
}
