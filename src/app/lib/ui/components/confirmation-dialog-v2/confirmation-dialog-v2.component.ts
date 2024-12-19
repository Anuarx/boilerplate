import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { InfoMessageComponent, InfoMessageInput } from '../info-message';

@Component({
  selector: 'app-confirmation-dialog-v2',
  standalone: true,
  imports: [
    MatDialogModule,
    ButtonComponent,
    IconButtonComponent,
    InfoMessageComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirmation-dialog-v2.component.html',
  styleUrl: './confirmation-dialog-v2.component.scss'
})
export class ConfirmationDialogV2Component {
  public mainMessage: string;
  public subMessage: string;
  public title: string
  public svg: string = ''
  public infoMessage: InfoMessageInput

  get infoMessageInput(): InfoMessageInput {
    return this.infoMessage
  }

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogV2Component>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title?: string
      mainMessage: string,
      subMessage: string,
      confirmButtonText?: string,
      cancelButtonText?: string
      svg?: string
      infoMessage?: InfoMessageInput
    }
  ) {
    this.title = data.title ? data.title : 'Confirmation'
    this.mainMessage = data.mainMessage ? data.mainMessage : ''
    this.subMessage = data.subMessage ? data.subMessage : ''
    this.data.confirmButtonText = data.confirmButtonText ? data.confirmButtonText : 'Confirm'
    this.data.cancelButtonText = data.cancelButtonText ? data.cancelButtonText : 'Cancel'
    this.svg = data.svg ? data.svg : ''

    if (data.infoMessage) {
      this.infoMessage = data.infoMessage
    }
  }
}
