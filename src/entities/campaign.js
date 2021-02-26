// @flow

class Campaign{
  id:string;
  name:string;
  campaignStartDate:string;
  campaignEndDate:string;
  actualStartDate:string;
  actualEndDate:string;
  status:string;
  statusTime:string;
  activeStartHour:number;
  activeStartMinute:number
  activeEndHour:number;
  activeEndMinute:number;
  activeOnWeekends:boolean;
  timezone:string;
  cmpCampaignStatusAudits:Array<any>;

  constructor(args:any){
    this.status = "draft";
    if(args) Object.assign(this, args);
  }

  toJSON(){
    const jsonData = {
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
    return JSON.parse(JSON.stringify(jsonData));
  }

  static fromJSON(value:any):Campaign{
    const campaign = new Campaign({ ...value });
    return campaign;
  }
}
export default Campaign;