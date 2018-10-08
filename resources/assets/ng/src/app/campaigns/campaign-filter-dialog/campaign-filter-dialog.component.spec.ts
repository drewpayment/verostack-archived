import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignFilterDialogComponent } from './campaign-filter-dialog.component';

describe('CampaignFilterDialogComponent', () => {
  let component: CampaignFilterDialogComponent;
  let fixture: ComponentFixture<CampaignFilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignFilterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
