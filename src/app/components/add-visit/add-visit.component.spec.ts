import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVisitComponent } from './add-visit.component';

describe('AddVisitComponent', () => {
  let component: AddVisitComponent;
  let fixture: ComponentFixture<AddVisitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVisitComponent]
    });
    fixture = TestBed.createComponent(AddVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
