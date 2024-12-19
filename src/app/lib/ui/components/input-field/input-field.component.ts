import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputLabelComponent } from '../input-label/input-label.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ui-input-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputLabelComponent,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})

export class InputFieldComponent {
  @Input() value: FormControl = new FormControl()

  @Input() label: string = ''
  @Input() default_value: string
  @Input() type: string = ''
  @Input() labelColor: string = 'white'
  @Input() placeHolder: string = 'Write here...'
  @Input() hintMessage: string = ''
  @Input() errorMessage: string = ''
  @Input() hintErrorMessage: string = ''
  @Input() suffixIcon: string = ''
  @Input() prefixIcon: string = ''
  @Input() SuffixText: string = ''
  @Input() PrefixText: string = ''
  @Input() labelTooltip: string = ''

  @Input() maxLength: number | null = null
  @Input() minLength: number | null = null
  @Input() max: number | null = null
  @Input() min: number | null = null

  @Input() required: boolean = false
  @Input() textArea: boolean = false
  @Input() max_width: boolean = false

  @Input() dataTestId: string = ''

  @Output() onChangeEvent: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  onChange($event: any): void {
    this.onChangeEvent.emit($event.target.value)
  }
}
