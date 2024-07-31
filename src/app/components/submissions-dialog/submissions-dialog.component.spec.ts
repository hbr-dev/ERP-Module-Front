import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionsDialogComponent } from './submissions-dialog.component';

describe('SubmissionsDialogComponent', () => {
  let component: SubmissionsDialogComponent;
  let fixture: ComponentFixture<SubmissionsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmissionsDialogComponent]
    });
    fixture = TestBed.createComponent(SubmissionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
