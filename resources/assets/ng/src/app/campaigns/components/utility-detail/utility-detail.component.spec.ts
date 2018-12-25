import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityDetailComponent } from './utility-detail.component';

describe('UtilityDetailComponent', () => {
  let component: UtilityDetailComponent;
  let fixture: ComponentFixture<UtilityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
