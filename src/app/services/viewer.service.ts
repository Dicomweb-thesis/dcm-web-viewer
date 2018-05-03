import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from '@angular/http';
import {StudyModel} from '../models/study.model';
import {SeriesModel} from '../models/series.model';
import {environment} from '../../environments/environment';
import {SeriesListService} from './series-list.service';

@Injectable()
export class ViewerService {
  private headers: HttpHeaders;
  private apiUrl: string;
  errorMessage: string;

  constructor(private http: HttpClient, private seriesListService: SeriesListService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',

    'Access-Control-Allow-Origin': '*'
    });

    this.apiUrl = environment.orthancUrl;


  }

  // async getStudyByID(study_ID) {
  //   try {
  //     return this.http.get(`${this.apiUrl}/studies/${study_ID}`).toPromise();
  //   } catch (err) {
  //     this.errorMessage = err;
  //   }
  // }

  // async getSeriesIDList(study_ID) {
  //   try {
  //     let study = await this.seriesListService.getStudyBy_ID(study_ID) as StudyModel;
  //     return study.Series;
  //   }catch (error){
  //     this.errorMessage=error;
  //   }
  // }
  // async getSeriesByID(series_ID){
  //   try{
  //     return this.http.get(`${this.apiUrl}/series/${series_ID}`).toPromise();
  //   }catch (error){
  //     this.errorMessage=error;
  //   }
  // }

  async getInstance_IDs(series_ID) {
    try {
      let series = await this.seriesListService.getSeriesBy_ID(series_ID) as SeriesModel;
      return series.Instances;
    } catch (error) {
      this.errorMessage = error;
    }
  }


  // private handleError(error: any) {
  //   console.log(error);
  //   if (error instanceof Response) {
  //     return Observable.throw(error.json()['error'] || 'server error');
  //   }
  //   return Observable.throw(error || 'server error');
  // }


}

