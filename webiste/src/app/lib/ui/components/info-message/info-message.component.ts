import { Component, EventEmitter, InputSignal, Output, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { InfoMessageInput } from './info-message.interfaces';

@Component({
  selector: 'ui-info-message',
  standalone: true,
  imports: [
    MatIconModule,
    IconButtonComponent,
  ],
  templateUrl: './info-message.component.html',
  styleUrl: './info-message.component.scss'
})
export class InfoMessageComponent {
  infoMessageInput: InputSignal<InfoMessageInput> = input.required()
}
