import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [MatDialogModule, ButtonComponent],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss'
})
export class SuccessDialogComponent {
  public message: string;
  public title: string

  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string
      message: string,
      confirmButtonText?: string,
      cancelButtonText?: string
    }
  ) {
    this.message = data.message ? data.message : 'Do you want to continue?'
    this.data.confirmButtonText = data.confirmButtonText ? data.confirmButtonText : 'Confirm'
    this.data.cancelButtonText = data.cancelButtonText ? data.cancelButtonText : 'Cancel'
  }
}
