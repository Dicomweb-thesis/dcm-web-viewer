import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ButtonModel} from '../../../models/button.model';
import {SeriesViewerComponent} from './series-viewer/series-viewer.component';

@Component({
  selector: 'app-series-viewer-wrap',
  templateUrl: './series-viewer-wrap.component.html',
  styleUrls: ['./series-viewer-wrap.component.css']
})
export class SeriesViewerWrapComponent implements OnInit, OnChanges {

  series_ID$: string;

  @Input() btnArr: ButtonModel[];
  @Input() selectedBtn: string;
  @ViewChild(SeriesViewerComponent) private seriesChild: SeriesViewerComponent;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  onDrop(data: any) {
    this.series_ID$ = null;
    setTimeout(() => this.series_ID$ = data, 50);
    // alert(`dropped: ${data}`);
  }

  disableAllTools() {
    this.seriesChild.disableAllTools();
  }



}
