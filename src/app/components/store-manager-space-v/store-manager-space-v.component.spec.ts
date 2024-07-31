import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreManagerSpaceVComponent } from './store-manager-space-v.component';

describe('StoreManagerSpaceVComponent', () => {
  let component: StoreManagerSpaceVComponent;
  let fixture: ComponentFixture<StoreManagerSpaceVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreManagerSpaceVComponent]
    });
    fixture = TestBed.createComponent(StoreManagerSpaceVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
