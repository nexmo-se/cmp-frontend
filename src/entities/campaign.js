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

  constructor(id=null, name=null, campaignStartDate=null, campaignEndDate=null, actualStartDate=null, actualEndDate=null, status="draft", statusTime=null, cmpCampaignStatusAudits=[]){
    this.id = id;
    this.name = name;
    this.campaignStartDate = campaignStartDate;
    this.campaignEndDate = campaignEndDate;
    this.actualStartDate = actualStartDate;
    this.actualEndDate = actualEndDate;
    this.status = status;
    this.statusTime = statusTime;
    this.cmpCampaignStatusAudits = cmpCampaignStatusAudits;
  }
}
export default Campaign;