import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Subscription } from 'rxjs';
import { ICustomSelectModel } from '../../interfaces/custom-select.interface';
import { InputLabelComponent } from '../input-label/input-label.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from "../button/button.component";
import { IconButtonComponent } from "../icon-button/icon-button.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ui-select-autocomplete',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    InputLabelComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonComponent,
    IconButtonComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './select-autocomplete.component.html',
  styleUrls: ['./select-autocomplete.component.scss'],
})
export class SelectAutocompleteComponent implements OnChanges {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  @Input() required: boolean = false
  @Input() multiple: boolean = false
  @Input() disabled: boolean = false
  @Input() max_width: boolean = false

  @Input() default_value: string = ''
  @Input() label: string
  @Input() labelColor: string = 'white'
  @Input() placeHolder: string = 'Choose an option'
  @Input() type: string = 'text'
  @Input() hintMessage: string = ''

  @Input() value: FormControl = new FormControl('ALL')

  @Input() options: ICustomSelectModel[] = []

  @Input() dataTestId: string = ''

  @Output() onInputChangeEvent: EventEmitter<string> = new EventEmitter<string>()
  @Output() onSelectionChangeEvent: EventEmitter<ICustomSelectModel> = new EventEmitter<ICustomSelectModel>()

  subscriptions: Subscription[] = []

  filteredOptions: ICustomSelectModel[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.options = changes['options'].currentValue
    }

    if (changes['default_value']) {
      this.default_value = changes['default_value'].currentValue
    }
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this._filter(filterValue)
  }

  private _filter(value: string): ICustomSelectModel[] {
    if (!value) return this.options

    const filterValue = value?.toLowerCase();

    return this.options.filter(option => option.label?.toLowerCase().includes(filterValue))
  }

  onInputChange($event: HTMLInputElement | any): void {
    this.onInputChangeEvent.emit($event.value)
  }

  trackbycode(index: number, accountingtype: ICustomSelectModel): string {
    return accountingtype.value as any
  }

  displayFn(option: ICustomSelectModel): string {
    return option && option.label ? option.label : '';
  }

  getClass(): { [key: string]: boolean } {
    return {
      'max-width-mat-field': this.max_width
    }
  }
}
