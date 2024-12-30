import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, InputFieldComponent } from '../../../../../ui';

@Component({
  selector: 'app-lotes-filter',
  imports: [CommonModule, ReactiveFormsModule, InputFieldComponent, ButtonComponent],
  templateUrl: './lotes-filter.component.html',
  styleUrl: './lotes-filter.component.scss'
})
export class LotesFilterComponent {
@Output() onFormChange: EventEmitter<any> = new EventEmitter<any>();

  firstName: FormControl = new FormControl('')
  lastName: FormControl = new FormControl('')
  email: FormControl = new FormControl('')

  form: FormGroup = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
  })

  onReset(): void {
    this.form.reset()
    this.onFormChange.emit({
      id: '',
      densidadSiembra: '',
      cicloFloracion: '',
      habito: '',
      usosSugeridos: 0
    })
  }

  onApply(): void {
    this.onFormChange.emit({
      id: this.firstName.value || '',
      email: this.email.value || '',
      lastName: this.lastName.value || '',
    })
  }
}
