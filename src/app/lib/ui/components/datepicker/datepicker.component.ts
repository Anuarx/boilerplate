import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { DateFilterFn, MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { InputLabelComponent } from '../input-label/input-label.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'ui-datepicker',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    InputLabelComponent,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  @Input() startDateLabel: string = ''
  @Input() endDateLabel: string = ''
  @Input() startDayPlaceholder: string = ''
  @Input() endDayPlaceHolder: string = ''
  @Input() labelColor: string = 'white'

  @Input() isRange: boolean = false
  @Input() max_width: boolean = false
  @Input() startDateRequired: boolean = false
  @Input() endDateRequired: boolean = false

  @Input() filterDatepicker: (date: Date | null) => boolean = () => true

  @Output() onStartDate: EventEmitter<string> = new EventEmitter<string>()
  @Output() onEndDate: EventEmitter<string> = new EventEmitter<string>()

  @Input() startDate: FormControl = new FormControl()
  @Input() endDate: FormControl = new FormControl()

  @Input() dataTestId: string = ''

  form: FormGroup = new FormGroup({
    startDate: this.startDate,
    endDate: this.endDate
  })

  constructor() { }

  ngOnInit(): void {
    this.emitDates(this.formatDate(this.startDate.value), this.formatDate(this.endDate.value))
  }

  formatDate(date: string): string {
    const formatDate = moment(date).format('YYYY-MM-DD')

    return formatDate
  }

  onStartDateChange($event: any): void {
    this.startDate.setValue($event.target.value)

    if ($event.target.value > this.endDate.value) {
      this.endDate.setValue($event.target.value)
      this.emitDates(this.formatDate($event.target.value), this.formatDate($event.target.value))
      return
    }

    this.onStartDate.emit(this.formatDate($event.target.value))
  }

  onEndDateChange($event: any): void {
    if ($event.target.value < this.startDate.value) {
      this.endDate.setValue(this.startDate.value)
      this.emitDates(this.formatDate(this.startDate.value), this.formatDate(this.startDate.value))
      return
    }

    this.endDate.setValue($event.target.value)

    this.onEndDate.emit(this.formatDate($event.target.value))
  }

  emitDates(startDate: string, endDate: string): void {
    this.onStartDate.emit(startDate)
    this.onEndDate.emit(endDate)
  }
}
