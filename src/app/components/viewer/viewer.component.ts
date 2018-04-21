import {Component, AfterViewInit, Input, OnInit, ViewChild} from '@angular/core';
import {CornerstoneService} from '../../services/cornerstone.service';
import {CornerstoneDirective} from '../../directives/cornerstone.directive';
import {ButtonModel} from '../../models/button.model';
import {MatrixModel} from '../../models/matrix.model';

import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoader.js';
import {from} from 'rxjs/observable/from';
import {ViewerService} from '../../services/viewer.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {SeriesListService} from '../../services/series-list.service';
import {directive} from '@angular/core/src/render3/instructions';
import {SeriesViewerWrapComponent} from './series-viewer-wrap/series-viewer-wrap.component';


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
  providers: [ViewerService, SeriesListService],
})
export class ViewerComponent implements OnInit, AfterViewInit {
  @ViewChild(SeriesViewerWrapComponent) private seriesWrapChild: SeriesViewerWrapComponent;
  // set appCornerstone(directive: CornerstoneDirective) {
  //   directive.clearAllFunc();
  // }

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
    {name: 'annotate', value: false},
    {name: 'seedpoint', value: false},
    {name: 'magnify', value: false},
    {name: 'rotate', value: false},
    {name: 'saveAs', value: false},
    {name: 'clearAll', value: false}
  ];
  layoutMatrices: MatrixModel[] = [
    {name: '1 x 1', row: ['1'], colunm: ['1']},
    {name: '1 x 2', row: ['1'], colunm: ['1', '1']},
    {name: '1 x 3', row: ['1'], colunm: ['1', '1', '1']},
    {name: '2 x 1', row: ['1', '1'], colunm: ['1']},
    {name: '2 x 2', row: ['1', '1'], colunm: ['1', '1']},
    {name: '2 x 3', row: ['1', '1'], colunm: ['1', '1', '1']},
    {name: '3 x 3', row: ['1', '1', '1'], colunm: ['1', '1', '1']}

  ];

  errorMessage: string;
  selectedMatrix: MatrixModel;
  layoutCurrentNo = '1 x 1';
  isSidebarActivated = true;
  study_ID: string;
  selectedBtn: string;

  // series_IDs: Array<string>;

  constructor(private viewerService: ViewerService, private seriesListService: SeriesListService, private route: ActivatedRoute) {
    this.selectedMatrix = {name: '1 x 1', row: ['1'], colunm: ['1']};
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.study_ID = params.get('study_ID');

    });
    this.selectedBtn = 'pan';
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
    this.layoutCurrentNo = matrix.name;
  }

  saveAsFunc(button: string) {
    this.disableAllTools();
    this.activateButton(button);
  }

  disableAllTools() {
    this.seriesWrapChild.disableAllTools();
  }

  clearAllToolsFunc(button: string) {
    this.disableAllTools();
    this.activateButton(button);
  }

}
