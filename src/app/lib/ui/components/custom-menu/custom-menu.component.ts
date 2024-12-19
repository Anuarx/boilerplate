import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { OverlayButtonComponent } from '../overlay-button/overlay-button.component';
import { CustomMenuInput } from './custom-menu.interfaces';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'ui-custom-menu',
  standalone: true,
  imports: [OverlayButtonComponent, IconButtonComponent,],
  templateUrl: './custom-menu.component.html',
  styleUrl: './custom-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomMenuComponent {
  customMenuInput = input.required<CustomMenuInput>()

  onClose(): void {
    this.customMenuInput().overlayButtonInput.isOpen = !this.customMenuInput().overlayButtonInput.isOpen
  }
}
