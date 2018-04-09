import {Component, Input, OnInit} from '@angular/core';
import {CornerstoneService} from '../../services/cornerstone.service';

@Component({
  selector: 'app-series-list-viewer',
  templateUrl: './series-list-viewer.component.html',
  styleUrls: ['./series-list-viewer.component.css'],
  providers: [CornerstoneService],

})
export class SeriesListViewerComponent implements OnInit {

  imagePathRoot: string = window.location.origin + '/assets/png/';
  imagePathList: Array<string> = new Array<string>();

  constructor(public csS: CornerstoneService) {
  }

  ngOnInit() {

    for (let i = 1; i < 8; i++) {
      this.imagePathList.push(this.imagePathRoot + i.toString() + '.png');
    }
    // console.log(this.imagePathList);
  }

}
