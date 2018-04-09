import {Component, OnInit} from '@angular/core';
import {Ng2SmartTableModule, LocalDataSource} from 'ng2-smart-table';
// import {SmartTableService} from '../core/data/smart-table.service';
import {StudyViewModel} from '../models/study-view.model';
import {StudyListService} from './shared/study-list.service';
import {ActivatedRoute, ParamMap,Router} from '@angular/router';
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
  countClick = 0;
  selectedID: string;



  // Setting up fields of the study table to viewing data
  settings = {
    columns: {
      StudyID: {
        title: 'Mã nghiên cứu',
        type: 'string',
      },
      StudyDate: {
        title: 'Ngày',
        type: 'string',
      },
      StudyDescription: {
        title: 'Mô tả',
        type: 'string',
      },
      AccessionNumber: {
        title: 'Accession Number',
        type: 'string',
      },
      InstitutionName: {
        title: 'Tên viện',
        type: 'string',
      },
      NumberOfSeries: {
        title: 'Số lượng series',
        type: 'number'
      }
    },
  };

  // Assigning data source of the study table
  dataSource = this.studies;

  constructor(private studyListService: StudyListService, private route: ActivatedRoute,private router:Router) {
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
      // console.log(this.dataSource);
    } catch (error) {
      this.errorMessage = error;
    }
  }

  onUserRowSelect(event) {
    this.selectedID = event.data.ID;
    this.countClick++;
    if (this.countClick === 2) {
      this.router.navigateByUrl(`/patients/${this.patientID}/studies/${this.selectedID}/series`);
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
