import { Component, input } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { DialogTitleInput } from './dialog-title.interfaces';

@Component({
  selector: 'ui-dialog-title',
  standalone: true,
  imports: [
    MatDialogModule,
    ButtonComponent,
    IconButtonComponent,
  ],
  templateUrl: './dialog-title.component.html',
  styleUrl: './dialog-title.component.scss'
})
export class DialogTitleComponent<T> {
  dialogTitleInput = input.required<DialogTitleInput<T>>();

  get title(): string {
    return this.dialogTitleInput().title;
  }

  get icon(): string {
    return this.dialogTitleInput().icon || 'close';
  }

  get dialogRef(): MatDialogRef<T> {
    return this.dialogTitleInput().dialogRef;
  }

  onClose(): void {
    this.dialogTitleInput().dialogRef.close();
  }
}

