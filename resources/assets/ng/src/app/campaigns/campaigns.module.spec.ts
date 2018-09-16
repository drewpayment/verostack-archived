import { CampaignsModule } from './campaigns.module';

describe('CampaignsModule', () => {
  let campaignsModule: CampaignsModule;

  beforeEach(() => {
    campaignsModule = new CampaignsModule();
  });

  it('should create an instance', () => {
    expect(campaignsModule).toBeTruthy();
  });
});
