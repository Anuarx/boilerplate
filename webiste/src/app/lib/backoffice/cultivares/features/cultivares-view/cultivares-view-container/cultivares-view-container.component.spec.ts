import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivaresViewContainerComponent } from './cultivares-view-container.component';

describe('CultivaresViewContainerComponent', () => {
  let component: CultivaresViewContainerComponent;
  let fixture: ComponentFixture<CultivaresViewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CultivaresViewContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CultivaresViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
