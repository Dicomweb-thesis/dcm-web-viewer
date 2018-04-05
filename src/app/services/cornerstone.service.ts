import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/first';

import * as cornerstone from 'cornerstone-core/dist/cornerstone.js';
import * as cornerstoneTools from 'cornerstone-tools/dist/cornerstoneTools.js';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoader.js';
// import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader/dist/cornerstoneWebImageLoader.js';
import * as cornerstoneWADOImageLoaderWebWorker from 'cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoaderWebWorker.js';
import * as cornerstoneWADOImageLoaderCodecs from 'cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoaderCodecs.js';


@Injectable()

export class CornerstoneService {

  constructor() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

    cornerstoneWADOImageLoader.configure({
      beforeSend: function (xhr) {
        // Add custom headers here (e.g. auth tokens)
        xhr.setRequestHeader('APIKEY', 'auth token');
        // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        // xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');

        // const apiKey = document.getElementById('apikey').value;
        // if(apiKey && apiKey.length) {
        //     xhr.setRequestHeader('APIKEY', apiKey);
        // }
      }
    });


  }

  fetchDicomImage(url: string): Observable<any> {
    // const xhr = new XMLHttpRequest();
    // xhr.open("GET", url, true);
    // xhr.setRequestHeader('Accept', 'application/dicom');
    // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    // xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');

    // xhr.onreadystatechange = function () {

    //   console.log(`fetching ${url}`);
    // }
    // xhr.send();
    return Observable.fromPromise(cornerstone.loadAndCacheImage(`wadouri:${url}`));
  }
}
