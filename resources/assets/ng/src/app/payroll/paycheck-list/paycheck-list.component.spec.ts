import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaycheckListComponent } from './paycheck-list.component';

describe('PaycheckListComponent', () => {
  let component: PaycheckListComponent;
  let fixture: ComponentFixture<PaycheckListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaycheckListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaycheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
