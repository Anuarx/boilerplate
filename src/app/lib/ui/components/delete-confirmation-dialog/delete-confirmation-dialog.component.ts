import { Component, Inject } from '@angular/core';
import { DialogTitleComponent } from '../dialog-title';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [
    DialogTitleComponent,
    MatDialogModule,
    ButtonComponent,
  ],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss'
})
export class DeleteConfirmationDialogComponent {
  dialogTitleInput = {
    title: 'Delete confirmation',
    icon: 'close',
    dialogRef: this.dialogRef,
  }

  public title: string = 'Are you sure you want to delete this group?'
  public message: string = 'This action cannot be undone.'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string
      message: string
    },
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
  ) {
    if (this.data.title && this.data.message) {
      this.title = this.data.title
      this.message = this.data.message
    }
  }
}
