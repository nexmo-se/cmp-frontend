import moment from "moment-timezone";
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

  constructor(
    id, 
    name, 
    campaignStartDate,
    campaignEndDate, 
    actualStartDate, 
    actualEndDate, 
    actualDuration, 
    status="draft", 
    statusTime, 
    activeStartHour,
    activeStartMinute,
    activeEndHour,
    activeEndMinute,
    activeOnWeekends,
    timezone,
    cmpCampaignStatusAudits=[]
  ){
    this.id = id;
    this.name = name;
    this.campaignStartDate = campaignStartDate;
    this.campaignEndDate = campaignEndDate;
    this.actualStartDate = actualStartDate;
    this.actualEndDate = actualEndDate;
    this.actualDuration = actualDuration;
    this.status = status;
    this.statusTime = statusTime;
    this.activeStartHour = activeStartHour;
    this.activeStartMinute = activeStartMinute;
    this.activeEndHour = activeEndHour;
    this.activeEndMinute = activeEndMinute;
    this.activeOnWeekends = activeOnWeekends;
    this.timezone = timezone;
    this.cmpCampaignStatusAudits = cmpCampaignStatusAudits;
  }

  toJSON(){
    return {
      name: this.name,
      campaignStartDate: this.campaignStartDate,
      campaignEndDate: this.campaignEndDate,
      activeStartHour: parseInt(this.activeStartHour),
      activeStartMinute: parseInt(this.activeStartMinute),
      activeEndHour: parseInt(this.activeEndHour),
      activeEndMinute: parseInt(this.activeEndMinute),
      activeOnWeekends: this.activeOnWeekends,
      timezone: this.timezone
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
    campaign.actualStartDate = value.actualStartDate;
    campaign.actualEndDate = value.actualEndDate;
    campaign.actualDuration = value.actualDuration;
    campaign.status = value.status;
    campaign.statusTime = value.statusTime;
    campaign.activeStartHour = value.activeStartHour;
    campaign.activeStartMinute = value.activeStartMinute;
    campaign.activeEndHour = value.activeEndHour;
    campaign.activeEndMinute = value.activeEndMinute;
    campaign.activeOnWeekends = value.activeOnWeekends;
    campaign.timezone = value.timezone;
    campaign.cmpCampaignStatusAudits = value.cmpCampaignStatusAudits;
    return campaign;
  }
}
export default Campaign;