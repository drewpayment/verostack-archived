import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnockListComponent } from './knock-list.component';

describe('KnockListComponent', () => {
  let component: KnockListComponent;
  let fixture: ComponentFixture<KnockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
