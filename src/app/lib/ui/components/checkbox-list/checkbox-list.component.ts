import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { CheckboxInput } from '../checkbox/checkbox.interfaces';

@Component({
  selector: 'ui-checkbox-list',
  standalone: true,
  imports: [CheckboxComponent],
  templateUrl: './checkbox-list.component.html',
  styleUrl: './checkbox-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxListComponent {
  checkboxList = input.required<CheckboxInput[]>()
}
