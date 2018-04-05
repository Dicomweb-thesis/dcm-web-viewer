import {Component, Input, OnInit} from '@angular/core';
import {CornerstoneDirective} from '../../directives/cornerstone.directive';
import {CornerstoneService} from '../../services/cornerstone.service';
import {ButtonModel} from '../button.model';

@Component({
  selector: 'app-series-viewer',
  templateUrl: './series-viewer.component.html',
  styleUrls: ['./series-viewer.component.css'],
  providers: [CornerstoneService],

})
export class SeriesViewerComponent implements OnInit {
  @Input() imageStore: Array<string>;
  // panView: boolean;

  imageData: any;
  imagePath: string = window.location.origin + '/assets/dicom/';
  imageHeaders: Array<string>;

  @Input() btnArr:ButtonModel[];

  // @Input() panView:boolean;
  // @Input() zoomView:boolean;
  // @Input() levelView:boolean;
  // pan = false;
  // zoom: boolean;

  // private cornerstoneDirective: CornerstoneDirective;

  constructor(public csS: CornerstoneService) {
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

    // this.csS.fetchDicomImage('http://localhost:8042/wado?requestType=WADO&studyUID=1.3.12.2.1107.5.2.2.9076.20051014125256000&seriesUID=1.3.12.2.1107.5.2.2.9076.20051014125635000002&objectUID=1.3.12.2.1107.5.8.1.12345.200510141312220835508&contentType=application/dicom')
    //   .subscribe(res => this.imageData = res);



    /** local */
    if (this.imageData === undefined) {
      this.imageStore = [
        'CT000000.dcm', 'CT000001.dcm', 'CT000002.dcm', 'CT000003.dcm', 'CT000004.dcm', 'CT000005.dcm', 'CT000006.dcm', 'CT000007.dcm',
        'CT000008.dcm', 'CT000009.dcm', 'CT000010.dcm', 'CT000011.dcm', 'CT000012.dcm', 'CT000013.dcm', 'CT000014.dcm', 'CT000015.dcm',
        'CT000016.dcm', 'CT000017.dcm', 'CT000018.dcm'
      ];
    }
    this.getImageData(this.imageStore);

  }

  updateHeaders(headerData: Array<string>) {
    this.imageHeaders = headerData;
  }

  getImageData(imageArray: Array<string>) {
    imageArray.forEach(image => {
      this.csS.fetchDicomImage(`${this.imagePath}${image}`).subscribe(res => {
        this.imageData = res;
        // console.log(res);
      });
    });
  }

}
