import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivaresViewTableComponent } from './cultivares-view-table.component';

describe('CultivaresViewTableComponent', () => {
  let component: CultivaresViewTableComponent;
  let fixture: ComponentFixture<CultivaresViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CultivaresViewTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CultivaresViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
