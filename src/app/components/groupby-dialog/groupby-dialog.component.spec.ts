import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupbyDialogComponent } from './groupby-dialog.component';

describe('GroupbyDialogComponent', () => {
  let component: GroupbyDialogComponent;
  let fixture: ComponentFixture<GroupbyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupbyDialogComponent]
    });
    fixture = TestBed.createComponent(GroupbyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
