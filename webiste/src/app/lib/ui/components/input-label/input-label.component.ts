import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'ui-input-label',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './input-label.component.html',
  styleUrls: ['./input-label.component.scss']
})
export class InputLabelComponent {
  @Input() required: boolean = false
  @Input() label: string = ''
  @Input() color: string = 'gray'
  @Input() dataTestId: string = ''
  @Input() tooltip: string = ''
}
