import moment from "moment";

class Report{
  // downloadURL:string|void;
  // name:string|void;
  // status:string|void;
  // submitTime:moment|void;
  // delivered:number|void;
  // rejected:number|void;
  // read:number|void;
  // totalRecord:number|void.

  constructor(delivered=0, rejected=0, totalRecord=0){
    this.delivered = delivered;
    this.rejected = rejected;
    this.totalRecord = totalRecord;
  }

  static fromJSON(value){
    const report = new Report();
    report.delivered = value.summary?.delivered || 0;
    report.rejected = value.summary?.rejected || 0;
    report.read = value.summary?.read || 0;
    report.totalRecord = value.summary?.total || 0;
    report.name = value.name || "";
    report.status = value.status || "";
    report.submitTime = new moment(value.submitTime) || "";
    report.downloadURL = value.url || ""
    return report;
  }
}
export default Report;