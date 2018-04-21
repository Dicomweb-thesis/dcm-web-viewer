import {Component, OnInit} from '@angular/core';
import {Ng2SmartTableModule, LocalDataSource} from 'ng2-smart-table';
// import {SmartTableService} from '../core/data/smart-table.service';
import {until} from 'selenium-webdriver';
import elementIsSelected = until.elementIsSelected;
import {Observable} from 'rxjs/Observable';
import {PatientViewModel} from '../../models/patient-view.model';
import {PatientListService} from '../../services/patient-list.service';
import {Http, Response} from '@angular/http';
import {tryCatch} from 'rxjs/util/tryCatch';
import {catchError} from 'rxjs/operators';
import {forEach} from '@angular/router/src/utils/collection';
import {StudyListComponent} from '../study-list/study-list.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
  providers: [PatientListService]
})
export class PatientListComponent implements OnInit {

  patients: PatientViewModel[];
  errorMessage: String;
  selectedID: string;
  countClick = 0;

  // Setting up fields of the patient table to viewing data
  settings = {
    columns: {
      PatientID: {
        title: 'Mã bệnh nhân',
        type: 'string',
      },
      PatientName: {
        title: 'Tên bệnh nhân',
        type: 'string',
      },
      PatientBirthDate: {
        title: 'Ngày sinh',
        type: 'string',
      },
      PatientSex: {
        title: 'Giới tính',
        type: 'string',
      },
      NumberOfStudies: {
        title: 'Số lượng nghiên cứu',
        type: 'number',
      },
      LastUpdate: {
        title: 'Cập nhật gần nhất',
        type: 'string'
      },
    }
  };

  // Assigning data source of the patient table
  dataSource = this.patients;

  constructor(private patientListService: PatientListService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadPatients();
    }

  /*
  * Loading patient list from server and assigning to dataSource
  * */
  async loadPatients() {
    try {
      this.patients = await this.patientListService.getListViewModel();
      this.dataSource = this.patients;
      // console.log(this.patients);
    } catch (error) {
      this.errorMessage = error;
    }
  }

  /*
  * Double click event on rows
  * */
  onUserRowSelect(event) {
    this.selectedID = event.data.PatientID;
    this.countClick++;
    if (this.countClick === 2) {
      this.router.navigateByUrl(`/patients/${this.selectedID}/studies`);
    }
    this.timeout();
  }

  /*
  * Set timeout for click event on rows
  * */
  timeout() {
    var timeout = setTimeout(() => {
      this.countClick = 0;
      this.timeout();
    }, 300);
    if (!this.countClick) {
      clearTimeout(timeout);
    }
  }


}


