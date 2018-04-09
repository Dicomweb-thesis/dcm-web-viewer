import {Directive, ElementRef, HostListener, EventEmitter, OnInit, Input, Output} from '@angular/core';

import Hammer from 'hammerjs';
import * as dicomParser from 'dicom-parser';
import * as cornerstone from 'cornerstone-core/dist/cornerstone.js';
import * as cornerstoneMath from 'cornerstone-math/dist/cornerstoneMath.js';
import * as cornerstoneTools from 'cornerstone-tools/dist/cornerstoneTools.js';
import {ButtonModel} from '../models/button.model';

cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

@Directive({
  selector: '[appCornerstone]',
})

export class CornerstoneDirective implements OnInit {

  element: any;
  currentIndex = 0;

  imageList = [];
  imageListId = [];
  headers: Array<string> = [];

  @Output() headersUpdated: EventEmitter<Array<String>> = new EventEmitter();

  @Input('image')
  set image(imageData: any) {
    if (imageData) {
      if (!this.imageList.filter(img => img.imageId === imageData.imageId).length) {
        this.imageList.push(imageData);
        this.imageListId.push(imageData.imageId);
      }

      if (imageData.imageId) {
        this.displayImage(imageData, this.element);
      }
      // console.log(this.imageList);
    }
  }

  @Input() btnArr: ButtonModel[];

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

  @HostListener('mouseover', ['$event'])
  onHover(event) {
    event.preventDefault();
    // this.zoomFunc(this.zoomDir);
    let activatedBtn;
    for (let btn of this.btnArr) {
      if (btn.value) {
        activatedBtn = btn.name;
      }
    }
    switch (activatedBtn) {
      case 'pan': {
        this.panFunc();
        break;
      }
      case 'zoom': {
        this.zoomFunc();
        break;
      }
      case 'level': {
        this.levelFunc();
        break;
      }
      case 'probe': {
        this.probeFunc();
        break;
      }
      case 'length': {
        this.lengthFunc();
        break;
      }
      case 'ellip': {
        this.ellipFunc();
        break;
      }
      case 'rectangle': {
        this.rectangleFunc();
        break;
      }
      case 'angle': {
        this.angleFunc();
        break;
      }
      case 'highlight': {
        this.highlightFunc();
        break;
      }
      case 'freehand': {
        this.freehandFunc();
        break;
      }
      case 'magnify':{
        this.magnifyFunc();
        break;
      }

    }

  }


  @HostListener('mousewheel', ['$event'])
  onMouseWheel(event) {
    event.preventDefault();

    const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

    if (delta > 0) {
      this.currentIndex++;
      if (this.currentIndex > this.imageList.length) {
        this.currentIndex = this.imageList.length - 1;
      }
    } else {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = 0;
      }
    }

    /** set the image to the current scroll index */
    this.headers['currentImage'] = this.currentIndex;
    this.image = this.imageList[this.currentIndex];
  }

  displayImage(image, element) {
    var stack = {
      currentImageIdIndex: 0,
      imageIds: this.imageListId
    };

    this.headers['currentImage'] = stack.currentImageIdIndex;

    /** get metadata using DicomParser */
    this.getImageHeaders(image);

    cornerstone.displayImage(element, image);

    // enable inputs
    cornerstoneTools.mouseInput.enable(element);
    cornerstoneTools.mouseWheelInput.enable(element);
    // cornerstoneTools.touchInput.enable(element);

    // Set the stack as tool state
    cornerstoneTools.addStackStateManager(element, ['stack']);
    cornerstoneTools.addToolState(element, 'stack', stack);

    // mouse
    cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
    cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
    cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
     cornerstoneTools.probe.enable(element);
    cornerstoneTools.length.enable(element);
    cornerstoneTools.ellipticalRoi.enable(element);
    cornerstoneTools.rectangleRoi.enable(element);
    cornerstoneTools.angle.enable(element);
    cornerstoneTools.highlight.enable(element);
    cornerstoneTools.magnify.enable(element);


    // touch / gesture
    // cornerstoneTools.zoomTouchPinch.activate(element); // - Pinch
    // cornerstoneTools.panMultiTouch.activate(element); // - Multi (x2)
    // cornerstoneTools.stackScrollTouchDrag.activate(element); // - Multi (x2) Drag


  }

  disableAllTools() {
    cornerstoneTools.wwwc.disable(this.element);
    cornerstoneTools.pan.activate(this.element, 2); // 2 is middle mouse button
    cornerstoneTools.zoom.activate(this.element, 4); // 4 is right mouse button
    cornerstoneTools.probe.deactivate(this.element, 1);
    cornerstoneTools.length.deactivate(this.element, 1);
    cornerstoneTools.ellipticalRoi.deactivate(this.element, 1);
    cornerstoneTools.rectangleRoi.deactivate(this.element, 1);
    cornerstoneTools.angle.deactivate(this.element, 1);
    cornerstoneTools.highlight.deactivate(this.element, 1);
    cornerstoneTools.freehand.deactivate(this.element, 1);
    cornerstoneTools.magnify.disable(this.element);
  }

  panFunc() {
    this.disableAllTools();
    cornerstoneTools.pan.activate(this.element, 1);
  }

  zoomFunc() {
    this.disableAllTools();
    cornerstoneTools.zoom.activate(this.element, 1);
  }

  levelFunc() {
    this.disableAllTools();
    cornerstoneTools.wwwc.activate(this.element, 1);
  }

  probeFunc() {
    this.disableAllTools();
    cornerstoneTools.probe.activate(this.element, 1);
  }

  lengthFunc() {
    this.disableAllTools();
    cornerstoneTools.length.activate(this.element, 1);
  }

  ellipFunc() {
    this.disableAllTools();
    cornerstoneTools.ellipticalRoi.activate(this.element, 1);
  }

  rectangleFunc() {
    this.disableAllTools();
    cornerstoneTools.rectangleRoi.activate(this.element, 1);
  }

  angleFunc() {
    this.disableAllTools();
    cornerstoneTools.angle.activate(this.element, 1);
  }

  highlightFunc() {
    this.disableAllTools();
    cornerstoneTools.highlight.activate(this.element, 1);
  }

  freehandFunc() {
    this.disableAllTools();
    cornerstoneTools.freehand.activate(this.element, 1);
  }
  magnifyFunc(){
    this.disableAllTools();
    var config = {
      magnifySize: 100,
      magnificationLevel: 100
    };
    cornerstoneTools.magnify.setConfiguration(config);
    cornerstoneTools.magnify.activate(this.element,1);
    // cornerstoneTools.magnifyTouchDrag.activate(this.element);

  }

  getImageHeaders(image) {
    try {
      /** Parse the byte array to get a DataSet object that has the parsed contents */
      var dataSet = dicomParser.parseDicom(image.data.byteArray/*, options */);

      /** Access a string element */
      this.headers['allImages'] = this.imageList.length;
      this.headers['currentImage'] = this.currentIndex;
      this.headers['patientName'] = dataSet.string('x00100010');
      this.headers['patientAge'] = dataSet.string('x00101010');
      this.headers['patientSex'] = dataSet.string('x00100040');
      this.headers['institutionName'] = dataSet.string('x00080080');
      this.headers['studyDate'] = dataSet.string('x00080020');
      this.headers['sliceThickness'] = dataSet.string('x00180040');
      this.headers['spacingSlices'] = dataSet.string('x00180088');

      this.headersUpdated.emit(this.headers);

    } catch (ex) {
      console.log('Error parsing byte stream', ex);
    }
  }
}
