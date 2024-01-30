import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FileData } from '../models/reveal-dom-dashboards/file-data';
import { RevealDomDashboardsService } from '../services/reveal-dom-dashboards.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
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
}
