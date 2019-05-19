import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportModelsComponent } from './import-models.component';

describe('ImportModelsComponent', () => {
  let component: ImportModelsComponent;
  let fixture: ComponentFixture<ImportModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
