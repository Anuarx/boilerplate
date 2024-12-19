import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivaresViewPageComponent } from './cultivares-view-page.component';

describe('CultivaresViewPageComponent', () => {
  let component: CultivaresViewPageComponent;
  let fixture: ComponentFixture<CultivaresViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CultivaresViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CultivaresViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
