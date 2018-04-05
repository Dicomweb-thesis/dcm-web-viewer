import {
  Component,
  AfterViewInit,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {CornerstoneService} from '../services/cornerstone.service';
import {CornerstoneDirective} from '../directives/cornerstone.directive';
import {ButtonModel} from './button.model';
import {MatrixModel} from './matrix.model';

import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoader.js';
import {from} from 'rxjs/observable/from';


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
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
  // btnArr1 = this.btnArr;
  layoutMatrices: MatrixModel[] = [
    {name: '1 x 1', row: ['1'], colunm: ['1']},
    {name: '1 x 2', row: ['1'], colunm: ['1', '1']},
    {name: '1 x 3', row: ['1'], colunm: ['1', '1', '1']},
    {name: '1 x 4', row: ['1'], colunm: ['1', '1', '1', '1']},
    {name: '2 x 2', row: ['1', '1'], colunm: ['1', '1']}
  ];

  selected: boolean;
  selectedMatrix: MatrixModel;
  // itemArr: any[] = [];
  layoutCurrentNo='1 x 1';

  constructor() {
    cornerstoneWADOImageLoader.webWorkerManager.initialize({
      webWorkerPath: '/assets/cornerstone/webworkers/cornerstoneWADOImageLoaderWebWorker.js',
      taskConfiguration: {
        'decodeTask': {
          codecsPath: 'cornerstoneWADOImageLoaderCodecs.js'
        }
      }
    });

    this.selectedMatrix = {name: '1 x 1', row: ['1'], colunm: ['1']};
    // this.setItemsArr();
  }

  ngOnInit() {
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
    this.layoutCurrentNo=matrix.name;
  }

  // setItemsArr(){
  //   for (let i = 1; i <= this.selectedMatrix.row.length * this.selectedMatrix.colunm.length; i++) {
  //     this.itemArr.push(i);
  //   }
  // }
}
