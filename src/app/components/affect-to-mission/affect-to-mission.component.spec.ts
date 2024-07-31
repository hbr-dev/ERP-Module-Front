import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectToMissionComponent } from './affect-to-mission.component';

describe('AffectToMissionComponent', () => {
  let component: AffectToMissionComponent;
  let fixture: ComponentFixture<AffectToMissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffectToMissionComponent]
    });
    fixture = TestBed.createComponent(AffectToMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
