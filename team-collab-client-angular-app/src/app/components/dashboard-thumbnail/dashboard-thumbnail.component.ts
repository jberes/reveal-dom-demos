import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { RevealDashboardsListService } from 'src/app/services/reveal-dashboards-list.service';

declare let $: any;

@Component({
  selector: 'app-dashboard-thumbnail',
  templateUrl: './dashboard-thumbnail.component.html',
  styleUrls: ['./dashboard-thumbnail.component.scss']
})
export class DashboardThumbnailComponent implements AfterViewInit {

  @ViewChild('thumbnail') thumbnail: any;
  @Input("dashboardId") dashboardId: string = "";

  constructor(private dashboardService: RevealDashboardsListService) { }
  
  ngAfterViewInit(): void {
    this.dashboardService.getDashboardThumbnail(this.dashboardId).subscribe(data => {
      let thumbnailView = new $.ig.RevealDashboardThumbnailView(this.thumbnail.nativeElement);
      thumbnailView.dashboardInfo = data.info;
    });
  }
}
