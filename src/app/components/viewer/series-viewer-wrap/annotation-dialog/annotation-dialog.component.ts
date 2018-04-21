import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-annotation-dialog',
  templateUrl: './annotation-dialog.component.html',
  styleUrls: ['./annotation-dialog.component.css']
})
export class AnnotationDialogComponent {
  constructor(public dialogRef: MatDialogRef<AnnotationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(){
    this.dialogRef.close();
  }



}
