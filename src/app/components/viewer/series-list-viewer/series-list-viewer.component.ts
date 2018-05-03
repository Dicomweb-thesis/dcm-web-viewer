import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CornerstoneService} from '../../../services/cornerstone.service';
import {SeriesListService} from '../../../services/series-list.service';
import {SeriesModel} from '../../../models/series.model';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-series-list-viewer',
  templateUrl: './series-list-viewer.component.html',
  styleUrls: ['./series-list-viewer.component.css'],
  providers: [SeriesListService],

})
export class SeriesListViewerComponent implements OnInit, OnChanges {

  imagePathRoot: string = window.location.origin + '/assets/png/';
  // imagePathList: Array<string> = new Array<string>();
  imageOrthancUrl: string = environment.orthancUrl + '/instances/';
  series_IDs: Array<string>;
  seriesList: Array<SeriesModel>;
  errorMessage: string;
  @Input() study_ID: string;

  constructor(private seriesListService: SeriesListService) {

  }

  ngOnInit() {
    // for (let i = 1; i < 8; i++) {
    //   this.imagePathList.push(this.imagePathRoot + i.toString() + '.png');
    // }
    // console.log(this.imagePathList);
  }

  ngOnChanges() {
    this.getSeries_IDs(this.study_ID);
    this.getSeriesList(this.study_ID);
  }

  async getSeries_IDs(study_ID) {
    try {
      this.series_IDs = await this.seriesListService.getSeries_IDs(study_ID);
    } catch (error) {
      this.errorMessage = error;
    }
  }

  async getSeriesList(study_ID: string) {
    try {
      this.seriesList = await this.seriesListService.getList(study_ID) as SeriesModel[];
    } catch (error) {
      this.errorMessage = error;
    }
  }

}
