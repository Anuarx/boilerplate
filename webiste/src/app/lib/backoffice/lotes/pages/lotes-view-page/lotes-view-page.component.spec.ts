import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesViewPageComponent } from './lotes-view-page.component';

describe('LotesViewPageComponent', () => {
  let component: LotesViewPageComponent;
  let fixture: ComponentFixture<LotesViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotesViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotesViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
