import faker from "faker";
import Campaign from "entities/campaign";
import moment from "moment";

class CampaignAPI{

  static generateDummy(){
    const campaign = new Campaign();
    campaign.id = faker.random.uuid();
    campaign.name = faker.random.word();
    campaign.campaignStartDate = new moment(faker.date.past()).toISOString();
    campaign.campaignEndDate = new moment(faker.date.future()).toISOString();
    campaign.status = faker.helpers.randomize([ 'pending', 'draft', 'started', 'paused', 'completed' ]);
    return campaign;
  }

  static listCampaign(dummy=false){
    const campaigns = [];
    for(let a=0; a < faker.random.number(20) && dummy; a++) campaigns.push(CampaignAPI.generateDummy());
    if(dummy) return campaigns;
  }

}
export default CampaignAPI;