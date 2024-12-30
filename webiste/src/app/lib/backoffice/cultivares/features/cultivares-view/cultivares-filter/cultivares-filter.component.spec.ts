import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivaresFilterComponent } from './cultivares-filter.component';

describe('CultivaresFilterComponent', () => {
  let component: CultivaresFilterComponent;
  let fixture: ComponentFixture<CultivaresFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CultivaresFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CultivaresFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
