class Campaign{
  // id: String
  // name: String
  // campaignStartDate: String
  // campaignEndDate: String
  // actualStartDate: String
  // actualEndDate: String
  // status: String
  // statusTime: String
  // cmpCampaignStatusAudits: Array

  constructor(id=null, name=null, campaignStartDate=null, campaignEndDate=null, actualStartDate=null, actualEndDate=null, actualDuration=null, status="draft", statusTime=null, cmpCampaignStatusAudits=[]){
    this.id = id;
    this.name = name;
    this.campaignStartDate = campaignStartDate;
    this.campaignEndDate = campaignEndDate;
    this.actualStartDate = actualStartDate;
    this.actualEndDate = actualEndDate;
    this.actualDuration = actualDuration;
    this.status = status;
    this.statusTime = statusTime;
    this.cmpCampaignStatusAudits = cmpCampaignStatusAudits;
  }

  toJSON(){
    return {
      name: this.name,
      campaignStartDate: this.campaignStartDate,
      campaignEndDate: this.campaignEndDate
    }
  }

  static fromID(id){
    return new Campaign(id);
  }

  static fromJSON(value){
    const campaign = new Campaign();
    campaign.id = value.id;
    campaign.name = value.name;
    campaign.campaignStartDate = value.campaignStartDate;
    campaign.campaignEndDate = value.campaignEndDate;
    campaign.actualStartDate = value.actualEndDate;
    campaign.actualEndDate = value.actualEndDate;
    campaign.actualDuration = value.actualDuration;
    campaign.status = value.status;
    campaign.statusTime = value.statusTime;
    return campaign;
  }
}
export default Campaign;