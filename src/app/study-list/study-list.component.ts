import {Component, OnInit} from '@angular/core';
import {Ng2SmartTableModule, LocalDataSource} from 'ng2-smart-table';
// import {SmartTableService} from '../core/data/smart-table.service';
import {StudyViewModel} from './shared/study.model';
import {StudyListService} from './shared/study-list.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {PatientListComponent} from '../patient-list/patient-list.component';

@Component({
  selector: 'app-study-list',
  templateUrl: './study-list.component.html',
  styleUrls: ['./study-list.component.css'],
  providers: [StudyListService]
})
export class StudyListComponent implements OnInit {
  studies: StudyViewModel[];
  errorMessage: String;
  patientID: string;

  // Setting up fields of the study table to viewing data
  settings = {
    columns: {
      StudyID: {
        title: 'Study ID',
        type: 'string',
      },
      StudyDate: {
        title: 'Study Date',
        type: 'string',
      },
      StudyTime: {
        title: 'Study Time',
        type: 'string',
      },
      AccessionNumber: {
        title: 'Accession Number',
        type: 'string',
      },
      InstitutionName: {
        title: 'Institution Name',
        type: 'string',
      },
      NumberOfSeries: {
        title: 'Number of series',
        type: 'number'
      }
    },
  };

  // Assigning data source of the study table
  dataSource = this.studies;

  constructor(private studyListService: StudyListService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id;
    // Get patientID from url for loading study list
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
      this.loadStudies(id);
    });
    this.patientID = id;
  }

  /*
  * Loading study list from server and assigning to dataSource
  * */
  async loadStudies(patientID) {
    try {
      this.studies = await this.studyListService.getListViewModel(patientID);
      this.dataSource = this.studies;
      console.log(this.dataSource);
    } catch (error) {
      this.errorMessage = error;
    }
  }


}
