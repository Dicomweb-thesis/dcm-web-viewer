import {Component, OnInit} from '@angular/core';
import {StudyViewModel} from '../../models/study-view.model';
import {SeriesModel} from '../../models/series.model';
import {SeriesListService} from '../../services/series-list.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SeriesViewModel} from '../../models/series-view.model';
import {StudyModel} from '../../models/study.model';
import {StudyMaindicomtagModel} from '../../models/study-maindicomtag.model';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css'],
  providers: [SeriesListService]
})
export class SeriesListComponent implements OnInit {
  series: SeriesViewModel[];
  errorMessage: String;
  patientID: string;
  studyID: string;
  study_ID: string;
  countClick = 0;
  selectedSeriesID: string;

  settings = {
    columns: {
      SeriesNumber: {
        title: 'Số series',
        type: 'string',
      },
      SeriesDate: {
        title: 'Ngày',
        type: 'string',
      },
      SeriesDescription: {
        title: 'Mô tả',
        type: 'string',
      },
      Modality: {
        title: 'Phương thức',
        type: 'string',
      },
      Manufacturer: {
        title: 'Máy sản xuất',
        type: 'string',
      },
      NumberOfInstances: {
        title: 'Số lượng ảnh',
        type: 'number'
      }
    },
  };

  dataSource = this.series;

  constructor(private seriesListService: SeriesListService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.patientID = params.get('patientID');
      this.study_ID = params.get('study_ID');
      this.loadSeries(this.study_ID);
    });
    this.getStudyID(this.study_ID);
  }

  async loadSeries(study_ID) {
    try {
      this.series = await this.seriesListService.getListViewModel(study_ID);
      this.dataSource = this.series;
    } catch (error) {
      this.errorMessage = error;
    }
  }

  async getStudyID(study_ID) {
    try {
      this.studyID = await this.seriesListService.getStudyID(study_ID);
    } catch (error) {
      this.errorMessage = error;
    }
  }

  onUserRowSelect(event) {
    this.selectedSeriesID = event.data.ID;
    this.countClick++;
    if (this.countClick === 2) {
      this.router.navigateByUrl(`/viewer/${this.study_ID}/${this.selectedSeriesID}`);
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
