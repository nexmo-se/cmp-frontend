import moment from "moment";

import CSVAPI from "api/csv";
import Campaign from "entities/campaign";
import Template from "entities/template";

class Record{
  constructor(recipient, campaign, template, parameters, startTime, duration, activeOnWeekends, timezone){
    this.recipient = recipient;
    this.campaign = campaign;
    this.template = template;
    this.paramters = parameters;
    this.startTime = startTime;
    this.duration = duration;
    this.activeOnWeekends = activeOnWeekends;
    this.timezone = timezone;
  }

  toJSON(){
    const startTime = new moment(this.startTime, "hh:mm");
    const activeStartHour = startTime.hour();
    const activeStartMinute = startTime.minute();

    const endTime = startTime.add(this.duration, "hours");
    const activeEndHour = endTime.hour();
    const activeEndMinute = endTime.minute();

    return {
      recipient: this.recipient,
      cmpCampaignId: this.campaign.id,
      cmpTemplateId: this.template.id,
      cmpParameters: this.parameters,
      activeStartHour,
      activeStartMinute,
      activeEndHour,
      activeEndMinute,
      activeOnWeekends: this.activeOnWeekends === "yes"? true: false,
      timezone: this.timezone
    }
  }

  static async fromJSON(value){
    const record = new Record();
    record.id = value.id;
    record.recipient = value.recipient;
    record.campaign = Campaign.fromJSON(value.cmpCampaign);
    record.template = Template.fromJSON(value.cmpTemplate);
    record.cmpRecordMessages = value.cmpRecordMessages;
  }
}
export default Record;