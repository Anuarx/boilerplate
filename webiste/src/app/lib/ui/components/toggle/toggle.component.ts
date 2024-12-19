import { Component, InputSignal, input, output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'ui-toggle',
  standalone: true,
  imports: [
    MatSlideToggleModule,
  ],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss'
})
//TODO: Implement Storybook
export class ToggleComponent {
  checked: InputSignal<boolean | undefined> = input.required<boolean | undefined>()
  disabled: InputSignal<boolean | undefined> = input<boolean | undefined>(false)
  label: InputSignal<string> = input<string>('')

  onToggleChange = output<void>()
}
