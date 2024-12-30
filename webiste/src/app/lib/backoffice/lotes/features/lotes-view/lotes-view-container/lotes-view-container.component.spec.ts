import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesViewContainerComponent } from './lotes-view-container.component';

describe('LotesViewContainerComponent', () => {
  let component: LotesViewContainerComponent;
  let fixture: ComponentFixture<LotesViewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotesViewContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotesViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
