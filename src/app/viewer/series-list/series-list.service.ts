import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { SeriesModel } from "./series.model";
@Injectable()
export class SeriesListService {
  private series: SeriesModel;
  constructor(private http: Http) {

   }

  getList(studyID): Promise<any> {
    let url = 'http://localhost:8042/studies/' + studyID + '/series';
    return this.http.get(url).toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

  async getListViewModel(studyID): Promise<SeriesModel[]> {
    let series = await this.getList(studyID);
    let seriesModel = [];

    for (let temp of series) {
      let seriModel = {
        'Manufacturer': temp.MainDicomTags.Manufacturer,
        'Modality': temp.MainDicomTags.Modality,
        'ProtocolName': temp.MainDicomTags.ProtocolName,
        'SeriesInstanceUID': temp.MainDicomTags.SeriesInstanceUID,
        'SeriesNumber': temp.MainDicomTags.SeriesNumber,

      };
      seriesModel.push(seriModel);
    }
    return seriesModel;
  }

}
