import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInformationComponent } from './client-information.component';

describe('ClientInformationComponent', () => {
  let component: ClientInformationComponent;
  let fixture: ComponentFixture<ClientInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
