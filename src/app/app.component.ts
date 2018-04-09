import {Component} from '@angular/core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoader.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor() {
    cornerstoneWADOImageLoader.webWorkerManager.initialize({
      webWorkerPath: '/assets/cornerstone/webworkers/cornerstoneWADOImageLoaderWebWorker.js',
      taskConfiguration: {
        'decodeTask': {
          codecsPath: 'cornerstoneWADOImageLoaderCodecs.js'
        }
      }
    });
  }



}


