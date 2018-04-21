import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../environments/environment';

import {PatientViewModel} from '../models/patient-view.model';

@Injectable()
export class PatientListService {
  private patientsUrl = 'http://localhost:4000/patients';

  constructor(private http: Http) {
  }

  /*
  * Get method - get patients list details from server
  * Return a patient list details
  * */
  getList(): Promise<any> {
    return this.http.get(this.patientsUrl).toPromise()
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
  * Customizing patient list from getList() function for viewing
  * Return a patient-view-model list from models
  * */
  async getListViewModel(): Promise<PatientViewModel[]> {
    let patients = await  this.getList();
    let patientsModel = [];
    for (let temp of patients) {
      let sex;
      if (temp.MainDicomTags.PatientSex === 'F') {
        sex = 'Female';
      } else if (temp.MainDicomTags.PatientSex === 'M') {
        sex = 'Male';
      } else {
        sex = 'Other';
      }
      let lastUpdate = temp.LastUpdate;
      lastUpdate = lastUpdate.substr(0, 4) + '-' + lastUpdate.substr(4, 2) + '-' + lastUpdate.substr(6, 2);
      let birthDate = temp.MainDicomTags.PatientBirthDate;
      birthDate = birthDate.substr(0, 4) + '-' + birthDate.substr(4, 2) + '-' + birthDate.substr(6, 2);

      let patientModel = {
        'ID': temp.ID,
        'PatientID': temp.MainDicomTags.PatientID,
        'PatientName': temp.MainDicomTags.PatientName,
        'PatientBirthDate': birthDate,
        'PatientSex': sex,
        'NumberOfStudies': temp.Studies.length,
        'LastUpdate': lastUpdate
      };
      patientsModel.push(patientModel);
    }
    return patientsModel;
  }


}
