import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {CornerstoneDirective} from '../../../../directives/cornerstone.directive';
import {CornerstoneService} from '../../../../services/cornerstone.service';
import {ButtonModel} from '../../../../models/button.model';
import {ViewerService} from '../../../../services/viewer.service';
import {environment} from '../../../../../environments/environment';
import {SeriesListService} from '../../../../services/series-list.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-series-viewer',
  templateUrl: './series-viewer.component.html',
  styleUrls: ['./series-viewer.component.css'],
  providers: [CornerstoneService,ViewerService],

})
export class SeriesViewerComponent implements OnInit, OnChanges, AfterViewInit{

  imageData: any;
  // imagePath: string = window.location.origin + '/assets/dicom/';
  private instanceApiUrl = `${environment.orthancUrl}/instances`;
  imageHeaders: Array<string>;
  instance_IDs: Array<string>;
  errorMessage: string;

  @Input() btnArr: ButtonModel[];
  @Input() series_ID: string;
  @Input() selectedBtn:string;

  @ViewChild(CornerstoneDirective) private corDir:CornerstoneDirective;

  constructor(public csS: CornerstoneService, private viewerService: ViewerService, public dialog:MatDialog) {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.getImageData(this.series_ID);
  }
  ngAfterViewInit(){
  }

  updateHeaders(headerData: Array<string>) {
    this.imageHeaders = headerData;
  }

  async getImageData(series_ID) {
    let IDs = await this.getInstances_IDs(series_ID) as Array<string>;
    for (let ID of IDs) {
      this.csS.fetchDicomImage(`${this.instanceApiUrl}/${ID}/file`).subscribe(res => {
        this.imageData = res;
      });
    }
  }

  async getInstances_IDs(series_ID: string) {
    try {
      return await this.viewerService.getInstance_IDs(series_ID);
    } catch (error) {
      this.errorMessage = error;
    }
  }

  disableAllTools(){
    this.corDir.disableAllTools();
  }

  onClick(){

  }


}
