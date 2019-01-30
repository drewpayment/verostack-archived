import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayCycleComponent } from './edit-pay-cycle.component';

describe('EditPayCycleComponent', () => {
  let component: EditPayCycleComponent;
  let fixture: ComponentFixture<EditPayCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPayCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPayCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
