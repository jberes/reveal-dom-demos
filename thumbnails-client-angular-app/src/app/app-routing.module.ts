import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { ErrorRoutingModule } from './error-routing/error-routing.module';
import { SimpleComboComponent } from './simple-combo/simple-combo.component';
import { BasicListComponent } from './basic-list/basic-list.component';
import { ImageListComponent } from './image-list/image-list.component';
import { BasicGridComponent } from './basic-grid/basic-grid.component';
import { CardViewComponent } from './card-view/card-view.component';
import { DashboardViewerComponent } from './dashboard-viewer/dashboard-viewer.component';

export const routes: Routes = [
  { path: 'error', component: UncaughtErrorComponent },
  { path: '', redirectTo: 'simple-combo', pathMatch: 'full' },
  { path: 'simple-combo', component: SimpleComboComponent, data: { text: 'SimpleCombo' } },
  { path: 'basic-list', component: BasicListComponent, data: { text: 'BasicList' } },
  { path: 'image-list', component: ImageListComponent, data: { text: 'ImageList' } },
  { path: 'basic-grid', component: BasicGridComponent, data: { text: 'BasicGrid' } },
  { path: 'card-view', component: CardViewComponent, data: { text: 'CardView' } },
  { path: 'dashboard-viewer', component: DashboardViewerComponent, data: { text: 'DashboardViewer' } },
  { path: '**', component: PageNotFoundComponent } // must always be last
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ErrorRoutingModule],
  exports: [RouterModule, ErrorRoutingModule]
})
export class AppRoutingModule {
}
