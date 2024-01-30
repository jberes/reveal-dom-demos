import { Component, OnInit } from '@angular/core';
import { RevealDashboardsListService } from '../services/reveal-dashboards-list.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  public revealDashboardsListDashboards: any = null;

  constructor(
    private revealDashboardsListService: RevealDashboardsListService,
  ) {}

  ngOnInit() {
    this.revealDashboardsListService.getDashboards().subscribe(data => this.revealDashboardsListDashboards = data);
  }
}
