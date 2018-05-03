// Modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {MaterialModule} from './modules/material.module';
import {InterceptorModule} from './modules/interceptor.module';
import {StoreModule} from '@ngrx/store';
import {loginReducer} from './reducers/login.reducer';

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
import {PatientListComponent} from './components/patient-list/patient-list.component';
import {StudyListComponent} from './components/study-list/study-list.component';
import {ViewerComponent} from './components/viewer/viewer.component';
import {SeriesListViewerComponent} from './components/viewer/series-list-viewer/series-list-viewer.component';
import {SeriesViewerComponent} from './components/viewer/series-viewer-wrap/series-viewer/series-viewer.component';
import {LoginComponent} from './components/login/login.component';
import {SeriesListComponent} from './components/series-list/series-list.component';
import {DraggableDirective} from './directives/draggable.directive';
import {DropTargetDirective} from './directives/drop-target.directive';
import {DragService} from './services/drag.service';
import {SeriesViewerWrapComponent} from './components/viewer/series-viewer-wrap/series-viewer-wrap.component';
import {AnnotationDialogComponent} from './components/viewer/series-viewer-wrap/annotation-dialog/annotation-dialog.component';


//
const routesConfig: Routes = [
  {path: '', component: PatientListComponent, canActivate: [AuthGuard], data: {role: RoleEnum.Admin}},
  {path: 'patients', component: PatientListComponent, canActivate: [AuthGuard], data: {role: RoleEnum.Admin}},
  {path: 'patients/:patientID/studies', component: StudyListComponent, canActivate: [AuthGuard], data: {role: RoleEnum.Admin}},
  {
    path: 'patients/:patientID/studies/:study_ID/series',
    component: SeriesListComponent,
    canActivate: [AuthGuard],
    data: {role: RoleEnum.Admin}
  },
  {path: 'viewer/:patientID/:study_ID', component: ViewerComponent, canActivate: [AuthGuard], data: {role: RoleEnum.Admin}},
  {path: 'viewer/:patientID/:study_ID/:series_ID', component: ViewerComponent, canActivate: [AuthGuard], data: {role: RoleEnum.Admin}},
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
    LoginComponent,
    DraggableDirective,
    DropTargetDirective,
    SeriesViewerWrapComponent,
    AnnotationDialogComponent
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
    StoreModule.forRoot({login: loginReducer})
  ],
  providers: [AuthGuard, AuthService, JwtHelperService, LocalStorageService, DataService, DragService],
  bootstrap: [AppComponent],
  entryComponents: [AnnotationDialogComponent]
})
export class AppModule {

}


