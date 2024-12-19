import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMultipleAutocompleteComponent } from './select-multiple-autocomplete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ICustomSelectModel } from '../../interfaces/custom-select.interface';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('SelectMultipleAutocompleteComponent', () => {
  let component: SelectMultipleAutocompleteComponent;
  let fixture: ComponentFixture<SelectMultipleAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectMultipleAutocompleteComponent, BrowserAnimationsModule, CommonModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectMultipleAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(component.value).toBeDefined();
    expect(component.onChangeEvent).toBeDefined();
    expect(component.default_value).toBeUndefined();
    expect(component.label).toBeUndefined();
    expect(component.placeHolder).toEqual('Choose an option');
    expect(component.labelColor).toEqual('white');
    expect(component.required).toBeFalse();
    expect(component.fullWidth).toBeFalse();
    expect(component.disabled).toBeFalse();
    expect(component.valueOptions).toBeDefined();
    expect(component.defaultValues).toBeDefined();
    expect(component.selectedOptions).toBeDefined();
    expect(component.searchControl).toBeDefined();
    expect(component.searchControlSignal).toBeDefined();
    expect(component.valueControlSignal).toBeDefined();
    expect(component.searchControlEffect).toBeDefined();
  });

  it('should set defaultValue if exist', () => {
    const defaultValue = 'apple';
    component.default_value = defaultValue;
    component.ngOnInit()

    expect(component.default_value).toEqual(defaultValue);
    expect(component.value.value).toEqual([defaultValue]);
  })

  it('should populate defaultValues signal with valueOptions signal on init', () => {
    component.valueOptions = signal(optionsExample) as any;
    component.ngOnInit()
    expect(component.defaultValues()).toEqual(component.valueOptions())
  })

  it('should change defaultValues when search control change', () => {
    component.valueOptions = signal(optionsExample) as any;
    component.ngOnInit()

    expect(component.valueOptions()).toEqual(optionsExample);
    expect(component.defaultValues()).toEqual(optionsExample);

    const searchValue = 'app';
    component.searchControl.setValue(searchValue);
    expect(component.searchControl.value).toEqual(searchValue);

    const defaultValuesSpy = spyOn(component, 'defaultValues')
    defaultValuesSpy.and.callThrough()
    defaultValuesSpy.and.returnValues([
      {
        label: 'Apple',
        value: 'apple',
      },
      {
        label: 'Apple2',
        value: 'apple2',
      }
    ])

    expect(component.defaultValues()).toEqual([
      {
        label: 'Apple',
        value: 'apple',
      },
      {
        label: 'Apple2',
        value: 'apple2',
      }
    ])
  })
});

const optionsExample: ICustomSelectModel[] = [
  {
    label: 'Apple',
    value: 'apple',
  },
  {
    label: 'Apple2',
    value: 'apple2',
  },
  {
    label: 'Banana',
    value: 'banana',
  },
  {
    label: 'Orange',
    value: 'orange',
  }
]
