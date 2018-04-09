import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from '@angular/http';
import {StudyModel} from '../../models/study.model';
import {SeriesModel} from '../../models/series.model';

@Injectable()
export class ViewerService {
  private headers: HttpHeaders;
  private apiUrl: string;
  errorMessage: string;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*'
    });

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
      // study as StudyModel;
      return study.Series;
    }catch (error){
      this.errorMessage=error;
    }
  }
  async getSeriesByID(series_ID){
    try{
      return this.http.get(`${this.apiUrl}series/${series_ID}`).toPromise();
    }catch (error){
      this.errorMessage=error;
    }
  }

  async getInstanceIDList(series_ID){
    try{
      let series=await this.getSeriesByID(series_ID) as SeriesModel;
      return series.Instances;
    }catch (error){
      this.errorMessage=error;
    }
  }



  private handleError(error: any) {
    console.log(error);
    if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'server error');
    }
    return Observable.throw(error || 'server error');
  }


}

