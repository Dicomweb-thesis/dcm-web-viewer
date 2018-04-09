import {Component, Input, OnInit} from '@angular/core';
import {CornerstoneDirective} from '../../directives/cornerstone.directive';
import {CornerstoneService} from '../../services/cornerstone.service';
import {ButtonModel} from '../../models/button.model';
import {ViewerService} from '../shared/viewer.service';

@Component({
  selector: 'app-series-viewer',
  templateUrl: './series-viewer.component.html',
  styleUrls: ['./series-viewer.component.css'],
  providers: [CornerstoneService],

})
export class SeriesViewerComponent implements OnInit {
  @Input() imageStore: Array<string>;

  imageData: any;
  // imagePath: string = window.location.origin + '/assets/dicom/';
  instanceApiUrl = 'http://localhost:8042/instances/';
  imageHeaders: Array<string>;
  instance_IDs: Array<string>;

  @Input() btnArr: ButtonModel[];
  @Input() study_ID: string;

  // @Input() panView:boolean;
  // @Input() zoomView:boolean;
  // @Input() levelView:boolean;
  // pan = false;
  // zoom: boolean;

  // private cornerstoneDirective: CornerstoneDirective;

  constructor(public csS: CornerstoneService, private viewerService: ViewerService) {
  }

  ngOnInit() {
    // for (const i of ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18']) {
    //    this.csS.fetchDicomImage(`http://localhost:4200/assets/dicom/CT0000${i}.dcm`)
    //    .subscribe(res => this.imageData = res);
    //  }

    // this.csS.fetchDicomImage('http://localhost:4000/instances/getFile')
    //   .subscribe(res => {
    //     console.log(res);
    //     this.imageData = res;
    //     console.log(res);
    //   });

    // this.csS.fetchDicomImage('http://localhost:8042/instances/b5601171-f8b530fb-64840a05-63a39614-8ca2ac55/file')
    //   .subscribe(res => this.imageData = res);


    /** local */
    // if (this.imageData === undefined) {
    //   this.imageStore = [
    //     'CT000000.dcm', 'CT000001.dcm', 'CT000002.dcm', 'CT000003.dcm', 'CT000004.dcm', 'CT000005.dcm', 'CT000006.dcm', 'CT000007.dcm',
    //     'CT000008.dcm', 'CT000009.dcm', 'CT000010.dcm', 'CT000011.dcm', 'CT000012.dcm', 'CT000013.dcm', 'CT000014.dcm', 'CT000015.dcm',
    //     'CT000016.dcm', 'CT000017.dcm', 'CT000018.dcm'
    //   ];
    // }

    // this.getInstances_IDs(this.study_ID);
    // console.log("test"+this.instance_IDs);
    this.getImageData(this.study_ID);

    // this.getImageData(this.imageStore);

  }

  updateHeaders(headerData: Array<string>) {
    this.imageHeaders = headerData;
  }

  async getImageData(study_ID) {
    let IDs = await this.getInstances_IDs(study_ID) as Array<string>;
    for (let ID of IDs) {
      this.csS.fetchDicomImage(`${this.instanceApiUrl}${ID}/file`).subscribe(res => {
        this.imageData = res;
      });
    }
  }

  async getInstances_IDs(study_ID) {
    let series_IDs = await this.viewerService.getSeriesIDList(this.study_ID);
    return await this.viewerService.getInstanceIDList(series_IDs[0]);
  }


}
