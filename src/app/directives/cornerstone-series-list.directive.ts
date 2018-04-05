import {Directive, ElementRef, HostListener, EventEmitter, OnInit, Input, Output} from '@angular/core';

import Hammer from 'hammerjs';
import * as dicomParser from 'dicom-parser';
import * as cornerstone from 'cornerstone-core/dist/cornerstone.js';
import * as cornerstoneMath from 'cornerstone-math/dist/cornerstoneMath.js';
import * as cornerstoneTools from 'cornerstone-tools/dist/cornerstoneTools.js';
import {ButtonModel} from '../viewer/button.model';

cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;


@Directive({
  selector: '[appCornerstoneSeriesList]',
})

export class CornerstoneDirective implements OnInit {

  element: any;
  currentIndex = 0;

  imageList = [];
  imageListId = [];
  headers: Array<string> = [];

  // @Output() headersUpdated: EventEmitter<Array<String>> = new EventEmitter();

  @Input('image')
  set image(imageData: any) {
    if (imageData) {
      // if (!this.imageList.filter(img => img.imageId === imageData.imageId).length) {
      //   this.imageList.push(imageData);
      //   this.imageListId.push(imageData.imageId);
      // }

      if (imageData.imageId) {
        this.displayImage(imageData, this.element);
      }
      // console.log(this.imageList);
    }
  }

  // @Input() btnArr: ButtonModel[];

  constructor(public elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  ngOnInit() {
    // Retrieve the DOM element itself
    this.element = this.elementRef.nativeElement;

    // Enable the element with Cornerstone
    cornerstone.enable(this.element);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    cornerstone.resize(this.element, true);
  }


// }


// @HostListener('mousewheel', ['$event'])
// onMouseWheel(event) {
//   event.preventDefault();
//
//   const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
//
//   if (delta > 0) {
//     this.currentIndex++;
//     if (this.currentIndex > this.imageList.length) {
//       this.currentIndex = this.imageList.length - 1;
//     }
//   } else {
//     this.currentIndex--;
//     if (this.currentIndex < 0) {
//       this.currentIndex = 0;
//     }
//   }

// /** set the image to the current scroll index */
// this.headers['currentImage'] = this.currentIndex;
// this.image = this.imageList[this.currentIndex];
// }

  displayImage(image, element) {


    /** get metadata using DicomParser */

    cornerstone.displayImage(element, image);

    // enable inputs
    cornerstoneTools.mouseInput.enable(element);
    cornerstoneTools.mouseWheelInput.enable(element);
    // cornerstoneTools.touchInput.enable(element);

    // Set the stack as tool state


    // touch / gesture
    // cornerstoneTools.zoomTouchPinch.activate(element); // - Pinch
    // cornerstoneTools.panMultiTouch.activate(element); // - Multi (x2)
    // cornerstoneTools.stackScrollTouchDrag.activate(element); // - Multi (x2) Dra
  }
}
