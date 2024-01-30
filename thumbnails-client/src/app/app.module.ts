import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleComboComponent } from './simple-combo/simple-combo.component';
import { IgxSimpleComboModule, IgxInputGroupModule, IgxListModule, IgxAvatarModule, IgxGridModule, IgxCardModule, IgxButtonModule, IgxRippleModule, IgxIconModule, IgxNavbarModule, IgxToggleModule, IgxNavigationDrawerModule } from 'igniteui-angular';
import { FormsModule } from '@angular/forms';
import { BasicListComponent } from './basic-list/basic-list.component';
import { ImageListComponent } from './image-list/image-list.component';
import { BasicGridComponent } from './basic-grid/basic-grid.component';
import { CardViewComponent } from './card-view/card-view.component';
import { DashboardViewerComponent } from './dashboard-viewer/dashboard-viewer.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardThumbnailComponent } from './dashboard-thumbnail/dashboard-thumbnail.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleComboComponent,
    BasicListComponent,
    ImageListComponent,
    BasicGridComponent,
    CardViewComponent,
    DashboardViewerComponent,
    DashboardThumbnailComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxSimpleComboModule,
    IgxInputGroupModule,
    FormsModule,
    IgxListModule,
    IgxAvatarModule,
    IgxGridModule,
    IgxCardModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxIconModule,
    IgxNavbarModule,
    IgxToggleModule,
    IgxNavigationDrawerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
