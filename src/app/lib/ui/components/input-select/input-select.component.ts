import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputLabelComponent } from '../input-label/input-label.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ICustomSelectModel } from '../../interfaces/custom-select.interface';

@Component({
  selector: 'ui-input-select',
  standalone: true,
  imports: [CommonModule, FormsModule, InputLabelComponent, MatInputModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule,],
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})

export class InputSelectComponent {
  @Output() onChangeEvent: EventEmitter<ICustomSelectModel> = new EventEmitter<ICustomSelectModel>()

  @Input() default_value: string | null = null

  @Input() valueOptions: ICustomSelectModel[] = []

  @Input() value: FormControl = new FormControl(null)

  @Input() label: string = ''
  @Input() labelColor: string = 'white'

  @Input() multiple: boolean = false
  @Input() required: boolean = false
  @Input() max_width: boolean = false
  @Input() disabled: boolean = false
  @Input() placeHolder = 'Choose an option'
  @Input() dataTestId: string = ''
  @Input() hintMessage: string = ''

  ngOnInit(): void {
    if (this.default_value) {
      this.value.setValue(this.default_value)
      return
    }

    if (this.multiple) {
      this.value.setValue([this.valueOptions[0]['value']])
      return
    }

    this.onChangeEvent.emit({
      label: this.valueOptions[0] ? this.valueOptions[0]['label'] : '',
      value: null,
    })
  }

  onChange($event: MatSelectChange): void {
    if (this.multiple) {
      let values: ICustomSelectModel[] = []

      this.valueOptions.forEach((customSelect: ICustomSelectModel) => {

        $event.value.forEach((result: string) => {
          if (result === customSelect.value) {
            values.push({
              label: customSelect.label,
              value: result
            })
          }
        })
      })

      if (!values.length) {
        this.value.setValue([this.valueOptions[0]['value']])
        this.onChangeEvent.emit([{
          label: this.valueOptions[0]['label'],
          value: this.valueOptions[0]['value']
        }] as any)
        return
      }

      this.onChangeEvent.emit(values as any)
      return
    }

    const response = this.valueOptions.find((result) => {
      return $event.value === result.value
    })

    this.onChangeEvent.emit(response)
  }

  getClass(): { [key: string]: boolean } {
    return {
      'max-width-mat-field': this.max_width
    }
  }
}
