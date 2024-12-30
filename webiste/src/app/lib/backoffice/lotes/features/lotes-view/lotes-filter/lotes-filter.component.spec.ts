import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesFilterComponent } from './lotes-filter.component';

describe('LotesFilterComponent', () => {
  let component: LotesFilterComponent;
  let fixture: ComponentFixture<LotesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotesFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
