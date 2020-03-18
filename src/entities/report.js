class Report{
  // delivered:number|void;
  // rejected:number|void;
  // totalRecord:number|void;

  constructor(){}

  static fromJSON(value){
    const report = new Report();
    report.delivered = value.summary.delivered || undefined;
    report.rejected = value.summary.rejected || undefined;
    report.totalRecord = value.summary.total || undefined;
    return report;
  }
}
export default Report;