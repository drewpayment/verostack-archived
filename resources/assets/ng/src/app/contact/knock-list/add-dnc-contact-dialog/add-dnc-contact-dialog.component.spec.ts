import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDncContactDialogComponent } from './add-dnc-contact-dialog.component';

describe('AddDncContactDialogComponent', () => {
  let component: AddDncContactDialogComponent;
  let fixture: ComponentFixture<AddDncContactDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDncContactDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDncContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
