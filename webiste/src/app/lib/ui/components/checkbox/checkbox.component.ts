import { ChangeDetectionStrategy, Component, ViewChild, effect, input } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { CheckboxInput } from './checkbox.interfaces';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [MatCheckbox],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @ViewChild("checkboxRef") public checkboxRef: MatCheckbox

  checkboxInput = input.required<CheckboxInput>()

  constructor() {
    effect(() => {
      if (this.checkboxRef) {
        this.checkboxRef.checked = this.checkboxInput().checked;
      }
    });
  }  
}
