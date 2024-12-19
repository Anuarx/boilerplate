import { Component, input } from '@angular/core';
import { MessageStatusList } from './message-status-list.interfaces';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ui-message-status-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './message-status-list.component.html',
  styleUrl: './message-status-list.component.scss'
})
export class MessageStatusListComponent {
  messageStatusListInput = input.required<MessageStatusList[]>()
}
