import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportModelSelectionComponent } from './import-model-selection.component';

describe('ImportModelSelectionComponent', () => {
  let component: ImportModelSelectionComponent;
  let fixture: ComponentFixture<ImportModelSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportModelSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportModelSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
