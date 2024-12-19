import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  isSessionExpired: boolean = false

  @Input() color: ThemePalette = 'primary';
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
  @Input() svg: string = ''
  @Input() isLoading: boolean = false;
  @Input() spinnerColor: string = 'primary';
  @Input() mat_menu: boolean = false
  @Input() bg_white: boolean = false
  @Input() full_width: boolean = false
  @Input() tooltip: string = ''
  @Input() dataTestId: string = ''

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>()

  getClass() {
    return {
      [`mat-${this.color}`]: true,
      'mat-icon-button': !!this.icon,
      'bg-white': this.bg_white,
      'full-width': this.full_width,
      'mat-menu': this.mat_menu,
      'disabled': this.disabled,
    };
  }

  onEmit(): void {
    this.onClick.emit()
  }
}
