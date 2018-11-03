import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabFloatBtnComponent } from './fab-float-btn.component';

describe('FabFloatBtnComponent', () => {
  let component: FabFloatBtnComponent;
  let fixture: ComponentFixture<FabFloatBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabFloatBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabFloatBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
