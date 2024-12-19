import { Component, EventEmitter, Input, OnInit, Output, WritableSignal, effect, input, signal } from '@angular/core';
import { ICustomSelectModel } from '../../interfaces/custom-select.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { InputLabelComponent } from '../input-label/input-label.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ui-select-multiple-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    CheckboxComponent,
    InputLabelComponent,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './select-multiple-autocomplete.component.html',
  styleUrl: './select-multiple-autocomplete.component.scss'
})
export class SelectMultipleAutocompleteComponent implements OnInit {
  @Input() value: FormControl = new FormControl([])

  @Output() onChangeEvent: EventEmitter<any[]> = new EventEmitter<any[]>()

  @Input() default_value: string
  @Input() label: string
  @Input() placeHolder: string = 'Choose an option'
  @Input() labelColor: string = 'white'
  @Input() hintMessage: string = ''

  @Input() required: boolean = false
  @Input() fullWidth: boolean = false
  @Input() disabled: boolean = false

  valueOptions = input<ICustomSelectModel[]>([])

  defaultValues: WritableSignal<ICustomSelectModel[]> = signal<ICustomSelectModel[]>([])
  selectedOptions: WritableSignal<ICustomSelectModel[]> = signal<ICustomSelectModel[]>([])

  searchControl: FormControl = new FormControl('')

  searchControlSignal = toSignal(this.searchControl.valueChanges)
  valueControlSignal = toSignal(this.value.valueChanges)

  searchControlEffect = effect(() => {
    const searchValue = this.searchControlSignal();
    let filteredOptions = this.valueOptions();

    if (searchValue) {
      filteredOptions = filteredOptions.filter((value) => {
        return value.label.toLowerCase().includes(searchValue.toLowerCase());
      });
    }

    const selectedValues = this.selectedOptions().map(opt => opt.value);
    const filteredWithSelected = [...new Set([...selectedValues, ...filteredOptions.map(opt => opt.value)])];

    this.defaultValues.set(filteredWithSelected.map(value => this.valueOptions().find(opt => opt.value === value)) as any);
  }, { allowSignalWrites: true });

  valueControlEffect = effect(() => {
    const currentValue = this.valueControlSignal();

    const selected = this.valueOptions().filter(option => currentValue?.includes(option.value));

    this.selectedOptions.set(selected);
  }, { allowSignalWrites: true });

  onValueControlEmit = effect(() => {
    this.onChangeEvent.emit(this.valueControlSignal())
  }, { allowSignalWrites: true })

  ngOnInit(): void {
    if (this.default_value) {
      this.value.setValue([this.default_value])
    }

    this.defaultValues.set(this.valueOptions())
  }

  onChange($event: MatSelectChange): void {
    this.onChangeEvent.emit($event.value)
  }

  selectAll(): void {
    if (this.selectedAll()) {
      this.value.setValue([])
      return
    }

    this.value.setValue(this.defaultValues().map((value) => value.value))
  }

  selectedAll(): boolean {
    return this.value.value.length === this.defaultValues().length
  }

  onReset(): void {
    this.value.setValue([])
  }

  onSetValues(values: any[]): void {
    this.value.setValue(values)
  }
}
