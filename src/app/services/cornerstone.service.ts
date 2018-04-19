import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/first';

import * as cornerstone from 'cornerstone-core/dist/cornerstone.js';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoader.js';

@Injectable()

export class CornerstoneService {

  constructor() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

    cornerstoneWADOImageLoader.configure({
      beforeSend: function (xhr) {
        // Add custom headers here (e.g. auth tokens)
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Content-Type', 'application/json,application/dicom');
        xhr.setRequestHeader('Accept', 'application/json,application/dicom');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

      }
    });
  }

  fetchDicomImage(url: string): Observable<any> {
    return Observable.fromPromise(cornerstone.loadImage(`wadouri:${url}`));
  }
}
