import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImportModelComponent } from './edit-import-model.component';

describe('EditImportModelComponent', () => {
  let component: EditImportModelComponent;
  let fixture: ComponentFixture<EditImportModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditImportModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImportModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
