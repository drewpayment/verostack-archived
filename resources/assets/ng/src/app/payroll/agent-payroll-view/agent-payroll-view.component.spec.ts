import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPayrollViewComponent } from './agent-payroll-view.component';

describe('AgentPayrollViewComponent', () => {
  let component: AgentPayrollViewComponent;
  let fixture: ComponentFixture<AgentPayrollViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentPayrollViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPayrollViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
