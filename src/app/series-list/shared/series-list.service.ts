import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '@angular/common/http';
import {StudyModel} from '../../models/study.model';
import {StudyViewModel} from '../../models/study-view.model';
import {SeriesViewModel} from '../../models/series-view.model';

@Injectable()

export class SeriesListService {
  private apiUrl: string;
  errorMessage: string;


  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8042/';

  }

  async getStudyByID(study_ID) {
    try {
      return this.http.get(`${this.apiUrl}studies/${study_ID}`).toPromise();
    } catch (err) {
      this.errorMessage = err;
    }
  }

  async getSeriesIDList(study_ID) {
    try {
      let study = await this.getStudyByID(study_ID) as StudyModel;
      return study.Series;
    } catch (error) {
      this.errorMessage = error;
    }
  }

  async getSeriesByID(series_ID) {
    try {
      return this.http.get(`${this.apiUrl}series/${series_ID}`).toPromise();
    } catch (error) {
      this.errorMessage = error;
    }
  }

  private handleError(error: any) {
    console.log(error);
    if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'server error');
    }
    return Observable.throw(error || 'server error');
  }

  async getList(study_ID){
    let seriesList=[];
    let IDs= await this.getSeriesIDList(study_ID);
    for(let ID of IDs){
      let series=await this.getSeriesByID(ID);
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
