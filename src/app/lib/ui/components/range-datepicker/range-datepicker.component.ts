import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, inject, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { RangeDatepickerEvent } from './range-datepicker.interface';
import { CommonModule } from '@angular/common';
import { DateFilterFn, MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { InputLabelComponent } from '../input-label/input-label.component';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AlertService } from '@ui/services/alert/alert.service';

@Component({
  selector: 'ui-range-datepicker',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, InputLabelComponent, ReactiveFormsModule, MatError, MatFormFieldModule, MatButtonModule],
  templateUrl: './range-datepicker.component.html',
  styleUrl: './range-datepicker.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeDatepickerComponent implements OnInit, OnDestroy {
  @ViewChild('picker') picker: MatDatepicker<Date>

  alertService = inject(AlertService)

  closeMethod: () => void

  subscription: Subscription

  @Input() label: string = ''

  @Input() startDayPlaceholder: string = ''
  @Input() endDayPlaceHolder: string = ''
  @Input() labelColor: string = 'white'

  @Input() max_width: boolean = false
  @Input() required: boolean = false

  @Input() form: FormGroup
  @Input() dataTestId: string = ''
  @Input() filterDatepicker: (date: DateFilterFn<any>) => boolean = () => true

  @Output() onDateChange: EventEmitter<RangeDatepickerEvent> = new EventEmitter<RangeDatepickerEvent>()

  range: FormGroup = new FormGroup({
    start: new FormControl<Date | null>(new Date()),
    end: new FormControl<Date | null>(new Date()),
  }) as FormGroup

  initial: boolean = false

  ngOnInit(): void {
    if (this.form) {
      this.range = this.form
    }

    this.subscription = this.range.valueChanges.subscribe((values) => {
      this.onDateChange.emit({
        startDate: values.start,
        endDate: values.end ? values.end : values.start,
      })

      if (values.end == null) {
        this.picker.close = () => {
          this.alertService.info('Please select an end date')
        }
      }

      if (values.end != null) {
        this.picker.close = this.closeMethod
      }
    })
  }

  ngAfterViewInit(): void {
    this.closeMethod = this.picker.close
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
