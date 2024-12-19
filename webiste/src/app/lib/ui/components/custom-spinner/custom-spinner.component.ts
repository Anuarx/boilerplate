import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'ui-custom-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, SpinnerComponent],
  templateUrl: './custom-spinner.component.html',
  styleUrls: ['./custom-spinner.component.scss']
})
export class CustomSpinnerComponent {
  @Input() diameter: string = '80';
  @Input() spinnerButton: string = '';
  @Input() color: ThemePalette = 'primary';
  @Input() mode: ProgressSpinnerMode = 'indeterminate';
  @Input() value = 0;
  @Input() dataTestId: string = '';
}
