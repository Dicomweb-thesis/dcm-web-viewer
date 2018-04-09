import {StudyMaindicomtagModel} from './study-maindicomtag.model';

export class StudyModel {
  ID: string;
  IsStable: string;
  LastUpdate: string;
  MainDicomTags: StudyMaindicomtagModel;
  ParentPatient: string;
  PatientMainDicomTags: any[];
  Series: any[];
  Type: string;
}
