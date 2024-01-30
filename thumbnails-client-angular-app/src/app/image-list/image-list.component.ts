import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FileData } from '../models/reveal-dom-dashboards/file-data';
import { RevealDomDashboardsService } from '../services/reveal-dom-dashboards.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit, OnDestroy {
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

  public listClick() {
    this.dashboardName = this.dashboardName as string;
  }

  public listItemClick(item: FileData) {
    this.dashboardName = item.name as string;
  }
}
