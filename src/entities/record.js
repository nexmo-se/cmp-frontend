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

  static async fromCSV(file){
    const { data } = await CSVAPI.parse(file);
    const [ campaignId, endingFileName ] = file.name.split("#");
    const [ templateId ] = endingFileName.split(".");
    const campaign = Campaign.fromID(campaignId);
    const template = Template.fromID(templateId);
    const newData = data.map((row, index) => {
      if(index <= 3) return undefined
      const [ recipient, startTime, duration, activeOnWeekends, timezone ] = row;
      const record = new Record();
      record.campaign = campaign;
      record.template = template;
      record.recipient = recipient;
      record.startTime = startTime;
      record.duration = duration;
      record.timezone = timezone;
      record.activeOnWeekends = activeOnWeekends;
      record.parameters = row.slice(5);
      return record;
    }).filter((record) => record);
    return newData
  }
}
export default Record;