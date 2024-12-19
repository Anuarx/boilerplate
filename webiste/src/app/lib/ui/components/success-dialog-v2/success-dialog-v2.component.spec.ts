import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessDialogV2Component } from './success-dialog-v2.component';

describe('SuccessDialogV2Component', () => {
  let component: SuccessDialogV2Component;
  let fixture: ComponentFixture<SuccessDialogV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessDialogV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessDialogV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
