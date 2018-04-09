import {Component, AfterViewInit, Input, OnInit, ViewChild} from '@angular/core';
import {CornerstoneService} from '../services/cornerstone.service';
import {CornerstoneDirective} from '../directives/cornerstone.directive';
import {ButtonModel} from '../models/button.model';
import {MatrixModel} from '../models/matrix.model';

import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoader.js';
import {from} from 'rxjs/observable/from';
import {ViewerService} from './shared/viewer.service';
import {ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
  providers: [ViewerService]
})
export class ViewerComponent implements OnInit, AfterViewInit {
  btnArr: ButtonModel[] = [
    {name: 'pan', value: false},
    {name: 'zoom', value: false},
    {name: 'level', value: false},
    {name: 'probe', value: false},
    {name: 'length', value: false},
    {name: 'ellip', value: false},
    {name: 'rectangle', value: false},
    {name: 'angle', value: false},
    {name: 'highlight', value: false},
    {name: 'freehand', value: false},
    {name: 'magnify', value: false}
  ];
  layoutMatrices: MatrixModel[] = [
    {name: '1 x 1', row: ['1'], colunm: ['1']},
    {name: '1 x 2', row: ['1'], colunm: ['1', '1']},
    {name: '1 x 3', row: ['1'], colunm: ['1', '1', '1']},
    {name: '1 x 4', row: ['1'], colunm: ['1', '1', '1', '1']},
    {name: '2 x 2', row: ['1', '1'], colunm: ['1', '1']}
  ];

  selectedMatrix: MatrixModel;
  layoutCurrentNo = '1 x 1';
  isSidebarActivated = true;
  study_ID: string;
  instance_IDs: string[];


  constructor(private viewerService: ViewerService, private route: ActivatedRoute) {
    // cornerstoneWADOImageLoader.webWorkerManager.initialize({
    //   webWorkerPath: '/assets/cornerstone/webworkers/cornerstoneWADOImageLoaderWebWorker.js',
    //   taskConfiguration: {
    //     'decodeTask': {
    //       codecsPath: 'cornerstoneWADOImageLoaderCodecs.js'
    //     }
    //   }
    // });

    this.selectedMatrix = {name: '1 x 1', row: ['1'], colunm: ['1']};

  }

  ngOnInit() {
    // Get patientID from url for loading study list
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.study_ID = params.get('study_ID');
      this.getInstances_IDs(this.study_ID);

    });
  }

  ngAfterViewInit() {
  }

  activateButton(selectedButton) {
    for (let btn of this.btnArr) {
      if (btn.value) {
        btn.value = false;
      }
      if (btn.name === selectedButton) {
        btn.value = true;
      }
    }
  }

  changeLayout(matrix) {
    this.layoutCurrentNo = matrix.name;
  }

  async getInstances_IDs(study_ID) {
    // let study= await this.viewerService.getStudyByID(this.study_ID);
    let series_IDs = await this.viewerService.getSeriesIDList(this.study_ID);
    this.instance_IDs = await this.viewerService.getInstanceIDList(series_IDs[0]);
    // console.log(this.instance_IDs);
  }

}
