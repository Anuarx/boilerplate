import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesViewTableComponent } from './lotes-view-table.component';

describe('LotesViewTableComponent', () => {
  let component: LotesViewTableComponent;
  let fixture: ComponentFixture<LotesViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotesViewTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotesViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
