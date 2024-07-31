import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreManagerSpaceMComponent } from './store-manager-space-m.component';

describe('StoreManagerSpaceComponent', () => {
  let component: StoreManagerSpaceMComponent;
  let fixture: ComponentFixture<StoreManagerSpaceMComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreManagerSpaceMComponent]
    });
    fixture = TestBed.createComponent(StoreManagerSpaceMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
