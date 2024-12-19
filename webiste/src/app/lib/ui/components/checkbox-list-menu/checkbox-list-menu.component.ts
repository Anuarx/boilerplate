import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CustomMenuComponent } from '../custom-menu/custom-menu.component';
import { CheckListMenuInput } from './checkbox-list-menu.interface';
import { CheckboxListComponent } from '../checkbox-list/checkbox-list.component';

@Component({
  selector: 'ui-checkbox-list-menu',
  standalone: true,
  imports: [CheckboxListComponent, CustomMenuComponent],
  templateUrl: './checkbox-list-menu.component.html',
  styleUrl: './checkbox-list-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxListMenuComponent {
  checkboxListMenuInput = input.required<CheckListMenuInput>()
}
