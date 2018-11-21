import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCycleComponent } from './pay-cycle.component';

describe('PayCycleComponent', () => {
  let component: PayCycleComponent;
  let fixture: ComponentFixture<PayCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
