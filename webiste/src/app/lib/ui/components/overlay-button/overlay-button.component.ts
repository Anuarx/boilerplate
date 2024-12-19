import { Component, Input, input, output } from '@angular/core';
import { OverlayButtonInput } from './overlay-button.interfaces';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'ui-overlay-button',
  standalone: true,
  imports: [CommonModule, ButtonComponent, OverlayModule, IconButtonComponent],
  templateUrl: './overlay-button.component.html',
  styleUrl: './overlay-button.component.scss'
})
export class OverlayButtonComponent {
  overlayButtonInput = input.required<OverlayButtonInput>()
  isOpenChange = output<boolean>()
}
