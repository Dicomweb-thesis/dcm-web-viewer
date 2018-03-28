import {Component, AfterViewInit, Input, OnInit} from '@angular/core';
import {CornerstoneService} from './cornerstone.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
  providers: [CornerstoneService]
})
export class ViewerComponent implements OnInit {

  @Input() imageStore: Array<string>;

  imageData: any;
  imageHeaders: Array<string>;

  constructor(public csS: CornerstoneService) {
  }

  ngOnInit() {
    this.csS.fetchDicomImage('http://localhost:8042/instances/bebbea9c-63716478-517c4a7b-18cb29db-5ee6706e/file')
      .subscribe(res => this.imageData = res);
    this.csS.fetchDicomImage('http://localhost:8042/instances/7bad8fab-fbdd709c-1720de3a-8860f002-5761d57a/file')
      .subscribe(res => this.imageData = res);
    // this.csS.fetchFromNodejs('http://localhost:4000/instances/7bad8fab-fbdd709c-1720de3a-8860f002-5761d57a')
    //   .subscribe(res => console.log('get success'))
  }

  updateHeaders(headerData: Array<string>) {
    this.imageHeaders = headerData;
  }
  // getImageData(imageArray: Array<string>) {
  //   imageArray.forEach(image => {
  //     this.csS.fetchDicomImage(`${this.imagePath}${image}`)
  //       .subscribe(res => {
  //         this.imageData = res;
  //         console.log(res);
  //       });
  //   });
  // }
}
