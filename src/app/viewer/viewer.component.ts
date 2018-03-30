import {Component, AfterViewInit, Input, OnInit} from '@angular/core';
import {CornerstoneService} from './cornerstone.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css'],
  providers: [CornerstoneService]
})
export class ViewerComponent implements OnInit {
  
  

  imageData: any;
  imageHeaders: Array<string>;
  arr = ["f0200ea6-f87841f7-bc747be9-499fb06d-e3b50a6c",
    "6a863e98-22664ba2-5d119098-55e3e3ee-4cdbcd58",
    "f0b9f0ab-110181f8-ce83a1a2-4d8eb2c9-0b682503",
    "9b41ef96-b4031ffc-b1b7ea5d-8a38d55d-fe804601",
    "e73100b0-e02601f0-986dd3c8-ab318f96-ae315b69",
    "dc33d5ba-86e21184-61df774d-88c0eec8-28b3e91d",
    "7c0140cb-40ceaaaf-a5e07756-6a708c0c-7dcbd7ed",
    "7be22b09-3fab2bc2-c3ceb7f6-a526d16d-b2da66a8",
    "ef13019a-9edf339d-395d8632-558518bf-b82b1b21",
    "979d54c3-7b1507c6-f738ccee-e35fd8c0-c6ee4ff4",
    "23f1307c-25e6d5fa-73de34cb-8ee02fa0-15ac4cc5",
    "e06e739b-fe7b56e8-9db0db09-8ab40565-eaf73c17",
    "3ef0864e-3d8d9b45-ee823ede-0c1d21ee-c9a40185",
    "985681e7-99cd2ce5-f7d79f12-27bfc29f-0e5a4d72",
    "4368e7c1-33f7303d-5fc9fcc6-6e5fde31-6959b209",
    "5d5a0159-5f761a6f-090c7624-94643e4d-1ceaa369",
    "8137542c-069dd229-d0226fba-f8c571cd-19c7b61a",
    "f6986df4-5f81676f-f0dd7a43-9015009e-8da18da3",
    "8360e726-6b5487ce-43aca2b4-55fe37d2-6de276d7",
    "4476310e-ecf6744a-a5a54925-16b65d9f-9dfe7054",
    "35095224-b89d1134-dfd23fcc-ffa43d4b-853b142d",
    "dbbdf730-0454554d-794773e4-93da1576-c8fe07b4"];
  constructor(public csS: CornerstoneService) {
  }

  ngOnInit() {
    for(var i in this.arr){
      this.csS.fetchDicomImage('http://localhost:8042/instances/'+this.arr[i]+'/file')
        .subscribe(res => this.imageData = res);
    } 
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
