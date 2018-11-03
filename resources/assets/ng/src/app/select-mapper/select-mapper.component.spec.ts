import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMapperComponent } from './select-mapper.component';

describe('SelectMapperComponent', () => {
  let component: SelectMapperComponent;
  let fixture: ComponentFixture<SelectMapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
