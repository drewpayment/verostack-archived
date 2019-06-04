import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImportModelComponent } from './add-import-model.component';

describe('AddImportModelComponent', () => {
  let component: AddImportModelComponent;
  let fixture: ComponentFixture<AddImportModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImportModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImportModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
