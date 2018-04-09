import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import {StudyViewModel} from '../../models/study-view.model';
import {PatientViewModel} from '../../models/patient-view.model';

@Injectable()
export class StudyListService {
  private study: StudyViewModel;

  constructor(private http: Http) {
  }

  /*
  * Get method - Get a list of studies from server by patientID
  * Return a study list details from server
  * */
  getList(patientID): Promise<any> {
    let url = 'http://localhost:4000/patients/' + patientID + '/studies';
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

  /*
  * Customizing list of studies from getList() function for viewing
  * Return a study-view-model list from models
  * */
  async getListViewModel(patientID): Promise<StudyViewModel[]> {
    let studies = await this.getList(patientID);
    let studiesModel = [];

    for (let temp of studies) {
      let date = temp.MainDicomTags.StudyDate;
      date = date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2);
      let studyModel = {
        'ID': temp.ID,
        'StudyID': temp.MainDicomTags.StudyID,
        'StudyDate': date,
        'StudyDescription': temp.MainDicomTags.StudyDescription,
        'AccessionNumber': temp.MainDicomTags.AccessionNumber,
        'InstitutionName': temp.MainDicomTags.InstitutionName,
        'NumberOfSeries': temp.Series.length
      };
      studiesModel.push(studyModel);
    }
    return studiesModel;
  }

  // postPatientID(patientID) {
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   const object = {PatientID: patientID};
  //   console.log(object);
  //   return this.http.post(this.studiesUrl, object, {headers})
  //     .toPromise()
  //     .then(response => response.json());
  // }


}
