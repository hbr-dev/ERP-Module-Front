import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationDilalogComponent } from './delete-confirmation-dilalog.component';

describe('DeleteConfirmationDilalogComponent', () => {
  let component: DeleteConfirmationDilalogComponent;
  let fixture: ComponentFixture<DeleteConfirmationDilalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmationDilalogComponent]
    });
    fixture = TestBed.createComponent(DeleteConfirmationDilalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
