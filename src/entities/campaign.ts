import { DateTime } from "luxon";

// TODO: Status Audit;
type StatusAudit = {}

interface Constructor {
  id: string;
  name: string;
  campaignStartDate: DateTime;
  campaignEndDate: DateTime;
  actualStartDate?: DateTime;
  actualEndDate?: DateTime;
  status: string;
  statusTime?: DateTime;
  activeStartHour: number;
  activeStartMinute: number;
  activeEndHour: number;
  activeEndMinute: number;
  activeOnWeekends: boolean;
  timezone: string;
  statusAudits?: StatusAudit[];
}

class Campaign{
  id: string;
  name: string;
  campaignStartDate: DateTime;
  campaignEndDate: DateTime;
  actualStartDate?: DateTime;
  actualEndDate?: DateTime;
  status: string;
  statusTime?: DateTime;
  activeStartHour: number;
  activeStartMinute: number;
  activeEndHour: number;
  activeEndMinute: number;
  activeOnWeekends: boolean;
  timezone: string;
  statusAudits?: StatusAudit[];

  constructor (args: Constructor) {
    this.id = args.id;
    this.name = args.name;
    this.campaignStartDate = args.campaignStartDate;
    this.campaignEndDate = args.campaignEndDate;
    this.actualStartDate = args.actualStartDate;
    this.actualEndDate = args.actualEndDate;
    this.status = args.status;
    this.statusTime = args.statusTime;
    this.activeStartHour = args.activeStartHour;
    this.activeStartMinute = args.activeStartMinute;
    this.activeEndHour = args.activeEndHour;
    this.activeEndMinute = args.activeEndMinute;
    this.activeOnWeekends = args.activeOnWeekends;
    this.timezone = args.timezone;
    this.statusAudits = args.statusAudits;
  }

  static fromResponse (response: Record<string, any>) {
    return new Campaign({
      id: response.id,
      name: response.name,
      campaignStartDate: DateTime.fromISO(response.campaignStartDate),
      campaignEndDate: DateTime.fromISO(response.campaignEndDate),
      actualStartDate: DateTime.fromISO(response.actualStartDate),
      actualEndDate: DateTime.fromISO(response.actualEndDate),
      status: response.status,
      statusTime: DateTime.fromISO(response.statusTime),
      activeStartHour: parseInt(response.activeStartHour),
      activeStartMinute: parseInt(response.activeStartMinute),
      activeEndHour: parseInt(response.activeEndHour),
      activeEndMinute: parseInt(response.activeEndMinute),
      activeOnWeekends: response.activeOnWeekends,
      timezone: response.timezone,
      statusAudits: response.statusAudits
    });
  }
}
export default Campaign;