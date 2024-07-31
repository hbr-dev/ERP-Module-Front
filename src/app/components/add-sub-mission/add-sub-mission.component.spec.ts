import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubMissionComponent } from './add-sub-mission.component';

describe('AddSubMissionComponent', () => {
  let component: AddSubMissionComponent;
  let fixture: ComponentFixture<AddSubMissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSubMissionComponent]
    });
    fixture = TestBed.createComponent(AddSubMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
