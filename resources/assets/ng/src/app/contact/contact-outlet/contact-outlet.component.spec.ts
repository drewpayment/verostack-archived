import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactOutletComponent } from './contact-outlet.component';

describe('ContactOutletComponent', () => {
  let component: ContactOutletComponent;
  let fixture: ComponentFixture<ContactOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
