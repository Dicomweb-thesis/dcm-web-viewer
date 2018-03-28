import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Ng2SmartTableModule} from 'ng2-smart-table';

import {AppComponent} from './app.component';
import {PatientListComponent} from './patient-list/patient-list.component';
import {StudyListComponent} from './study-list/study-list.component';
import {CornerstoneDirective} from './viewer/cornerstone.directive';

//
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ViewerComponent} from './viewer/viewer.component';
import { SeriesListComponent } from './viewer/series-list/series-list.component';
//
const routesConfig: Routes = [
  {path: '', component: PatientListComponent},
  {path: 'patients', component: PatientListComponent},
  {path: 'patients/:id/studies', component: StudyListComponent},
  {path: 'viewer', component: ViewerComponent}

];

//
@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    StudyListComponent,
    ViewerComponent,
    SeriesListComponent,
    CornerstoneDirective
  ],
  imports: [
    BrowserModule,
    Ng2SmartTableModule,
    //
    RouterModule.forRoot(routesConfig),
    CommonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}