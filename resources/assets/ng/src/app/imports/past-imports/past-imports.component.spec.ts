import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastImportsComponent } from './past-imports.component';

describe('PastImportsComponent', () => {
  let component: PastImportsComponent;
  let fixture: ComponentFixture<PastImportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastImportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastImportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
