// Modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {MaterialModule} from './modules/material.module';
import {InterceptorModule} from './modules/interceptor.module';

// Services
import {AuthGuard} from './services/auth-guard.service';
import {RoleEnum} from './services/settings.service';
import {AuthService} from './services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LocalStorageService} from './services/local-storage.service';
import {DataService} from './services/data.service';

// Directives
import {CornerstoneDirective} from './directives/cornerstone.directive';

// Components
import {AppComponent} from './app.component';
import {PatientListComponent} from './patient-list/patient-list.component';
import {StudyListComponent} from './study-list/study-list.component';
import {ViewerComponent} from './viewer/viewer.component';
import {SeriesListViewerComponent} from './viewer/series-list-viewer/series-list-viewer.component';
import {SeriesViewerComponent} from './viewer/series-viewer/series-viewer.component';
import {LoginComponent} from './users/login/login.component';
import {SeriesListComponent} from './series-list/series-list.component';


//
const routesConfig: Routes = [
  {path: '', component: PatientListComponent, canActivate: [AuthGuard], data: {role: RoleEnum.Normal}},
  {path: 'patients', component: PatientListComponent, canActivate: [AuthGuard], data: {role: RoleEnum.Normal}},
  {path: 'patients/:id/studies', component: StudyListComponent, canActivate: [AuthGuard], data: {role: RoleEnum.Normal}},
  {
    path: 'patients/:patientID/studies/:studyID/series',
    component: SeriesListComponent,
    canActivate: [AuthGuard],
    data: {role: RoleEnum.Normal}
  },
  {path: 'viewer/:study_ID/:series_ID', component: ViewerComponent, canActivate: [AuthGuard], data: {role: RoleEnum.Normal}},
  {path: 'login', component: LoginComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    CornerstoneDirective,
    PatientListComponent,
    StudyListComponent,
    ViewerComponent,
    SeriesListComponent,
    SeriesViewerComponent,
    SeriesListViewerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    Ng2SmartTableModule,
    //
    RouterModule.forRoot(routesConfig),
    CommonModule,
    MaterialModule,
    HttpClientModule,
    InterceptorModule,

  ],
  providers: [AuthGuard, AuthService, JwtHelperService,LocalStorageService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule {

}


