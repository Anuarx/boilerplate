import { Component, effect, EventEmitter, Output } from '@angular/core';
import { InputFieldComponent } from '../../../ui';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoginFormInput } from './login-form.interface';

@Component({
  selector: 'app-login-form',
  imports: [InputFieldComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  
  email: FormControl = new FormControl('', [Validators.required]);
  password: FormControl = new FormControl('', [Validators.required]);

  form: FormGroup = new FormGroup({
    email: this.email,
    password: this.password
  });

  @Output() onFormChange: EventEmitter<LoginFormInput> = new EventEmitter<LoginFormInput>();
  @Output() onFormStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  formChangeSignal = toSignal(this.form.valueChanges);
  formChangeEffect = effect(() => {
    this.onFormChange.emit(this.formChangeSignal());
  })

  formStatusSignal = toSignal(this.form.statusChanges);
  formStatusEffect = effect(() => {
    this.onFormStatusChange.emit(this.formStatusSignal() === 'VALID');
  })
}
