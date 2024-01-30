import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

declare let $: any;
$.ig.RevealSdkSettings.setBaseUrl(environment.revealServer);

@Component({
  selector: 'app-dashboard-viewer',
  templateUrl: './dashboard-viewer.component.html',
  styleUrls: ['./dashboard-viewer.component.scss']
})
export class DashboardViewerComponent implements AfterViewInit {

@ViewChild('revealView') el!: ElementRef;
private revealView: any;

constructor(private route: ActivatedRoute)
{}

ngAfterViewInit(): void {
   let id = this.route.snapshot.paramMap.get('id');
   // let id = 'Sales';
  
    $.ig.RVDashboard.loadDashboard(id).then((dashboard: any) => {
      // Create a New Instance of a RevealView
      this.revealView = new $.ig.RevealView(this.el.nativeElement);

      // Assign the Dashboard to the RevealView
      this.revealView.dashboard = dashboard;
    });
  }
}
