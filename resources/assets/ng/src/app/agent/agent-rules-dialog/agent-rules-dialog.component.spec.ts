import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRulesDialogComponent } from './agent-rules-dialog.component';

describe('AgentRulesDialogComponent', () => {
  let component: AgentRulesDialogComponent;
  let fixture: ComponentFixture<AgentRulesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentRulesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentRulesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
