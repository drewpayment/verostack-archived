import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsSelectionComponent } from './campaigns-selection.component';

describe('CampaignsSelectionComponent', () => {
  let component: CampaignsSelectionComponent;
  let fixture: ComponentFixture<CampaignsSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
