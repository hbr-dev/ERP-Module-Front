import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaManagerSpaceComponent } from './area-manager-space.component';

describe('AreaManagerSpaceComponent', () => {
  let component: AreaManagerSpaceComponent;
  let fixture: ComponentFixture<AreaManagerSpaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaManagerSpaceComponent]
    });
    fixture = TestBed.createComponent(AreaManagerSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
