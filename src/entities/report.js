class Report{
  // delivered:number|void;
  // rejected:number|void;
  // totalRecord:number|void;

  constructor(){}

  static fromJSON(value){
    const report = new Report();
    report.delivered = value.summary.delivered || 0;
    report.rejected = value.summary.rejected || 0;
    report.totalRecord = value.summary.total || 0;
    return report;
  }
}
export default Report;