import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaManagerManagementComponent } from './area-manager-management.component';

describe('AreaManagerManagementComponent', () => {
  let component: AreaManagerManagementComponent;
  let fixture: ComponentFixture<AreaManagerManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaManagerManagementComponent]
    });
    fixture = TestBed.createComponent(AreaManagerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
