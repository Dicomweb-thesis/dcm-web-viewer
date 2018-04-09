import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {PatientListComponent} from './patient-list/patient-list.component';
import {StudyListComponent} from './study-list/study-list.component';
import {CornerstoneDirective} from './directives/cornerstone.directive';

//
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ViewerComponent} from './viewer/viewer.component';
import {SeriesListViewerComponent} from './viewer/series-list-viewer/series-list-viewer.component';
import {SeriesViewerComponent} from './viewer/series-viewer/series-viewer.component';

//
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {LoginComponent} from './users/login/login.component';
import {SeriesListComponent} from './series-list/series-list.component';

@NgModule({
  exports: [
    // CDK
    A11yModule,
    BidiModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    ScrollDispatchModule,
    CdkStepperModule,
    CdkTableModule,

    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  declarations: [LoginComponent]
})
export class MaterialModule {
}

//
const routes: Routes = [
  {path: '', component: PatientListComponent},
  {path: 'patients', component: PatientListComponent},
  {path: 'patients/:id/studies', component: StudyListComponent},
  {path: 'patients/:patientID/studies/:studyID/series', component: SeriesListComponent},
  {path: 'viewer/:study_ID/:series_ID', component: ViewerComponent},
  {path: 'login', component: LoginComponent}

];

//
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

  ],
  imports: [
    BrowserModule,
    Ng2SmartTableModule,
    //
    RouterModule.forRoot(routes),
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}


