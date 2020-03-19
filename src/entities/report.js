class Report{
  // delivered:number|void;
  // rejected:number|void;
  // totalRecord:number|void;

  constructor(delivered=0, rejected=0, totalRecord=0){
    this.delivered = delivered;
    this.rejected = rejected;
    this.totalRecord = totalRecord;
  }

  static fromJSON(value){
    const report = new Report();
    report.delivered = value.summary.delivered || 0;
    report.rejected = value.summary.rejected || 0;
    report.totalRecord = value.summary.total || 0;
    return report;
  }
}
export default Report;