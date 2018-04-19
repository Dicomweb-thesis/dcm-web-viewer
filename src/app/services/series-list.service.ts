import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '@angular/common/http';
import {StudyModel} from '../models/study.model';
import {StudyViewModel} from '../models/study-view.model';
import {SeriesViewModel} from '../models/series-view.model';
import {environment} from '../../environments/environment';

@Injectable()

export class SeriesListService {
  // private apiUrl: string;
  errorMessage: string;


  constructor(private http: HttpClient) {
    // this.apiUrl = environment.orthancUrl;

  }

  async getStudyBy_ID(study_ID) {
    // try {
      return this.http.get(`${environment.orthancUrl}/studies/${study_ID}`).toPromise();
    // } catch (err) {
    //   this.errorMessage = err;
    // }
  }
  async getStudyID(study_ID) {
    let study = await this.getStudyBy_ID(study_ID) as StudyModel;
    return study.MainDicomTags.StudyID;
  }
  async getSeries_IDs(study_ID) {
    // try {
      let study = await this.getStudyBy_ID(study_ID) as StudyModel;
      return study.Series;
    // } catch (error) {
    //   this.errorMessage = error;
    // }
  }

  async getSeriesBy_ID(series_ID) {
    // try {
      return this.http.get(`${environment.orthancUrl}/series/${series_ID}`).toPromise();
    // } catch (error) {
    //   this.errorMessage = error;
    // }
  }

  // private handleError(error: any) {
  //   console.log(error);
  //   if (error instanceof Response) {
  //     return Observable.throw(error.json()['error'] || 'server error');
  //   }
  //   return Observable.throw(error || 'server error');
  // }

  async getList(study_ID) {
    let seriesList = [];
    let IDs = await this.getSeries_IDs(study_ID);
    for (let ID of IDs) {
      let series = await this.getSeriesBy_ID(ID);
      seriesList.push(series);
    }
    return seriesList;
  }

  async getListViewModel(study_ID): Promise<SeriesViewModel[]> {
    let seriesList = await this.getList(study_ID);
    let seriesListModel = [];

    for (let temp of seriesList) {
      let date = temp.MainDicomTags.SeriesDate;
      date = date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2);
      let seriesModel = {
        'ID': temp.ID,
        'SeriesNumber': temp.MainDicomTags.SeriesNumber,
        'SeriesDate': date,
        'SeriesDescription': temp.MainDicomTags.SeriesDescription,
        'Modality': temp.MainDicomTags.Modality,
        'Manufacturer': temp.MainDicomTags.Manufacturer,
        'NumberOfInstances': temp.Instances.length
      };
      seriesListModel.push(seriesModel);
    }
    return seriesListModel;
  }

}
