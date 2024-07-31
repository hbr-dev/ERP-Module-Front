import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaManagerVisitsComponent } from './area-manager-visits.component';

describe('AreaManagerVisitsComponent', () => {
  let component: AreaManagerVisitsComponent;
  let fixture: ComponentFixture<AreaManagerVisitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaManagerVisitsComponent]
    });
    fixture = TestBed.createComponent(AreaManagerVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
