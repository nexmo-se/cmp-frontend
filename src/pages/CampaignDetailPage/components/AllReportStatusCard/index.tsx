import { useReportData } from "../SummaryReport";

import Row from "./components/Row";

function AllReportStatusCard () {
  const { report } = useReportData();
  console.log(report);

  if (!report) return null;
  else {
    return (
      <div className="Vlt-card Vlt-card--border">
        <div className="Vlt-card__header">
          <h4>Summary Status</h4>
        </div>
        <div className="Vlt-card__content">
          <Row label="Submitted" value={report.submitted} />
          <Row label="Read" value={report.read} />
          <Row label="Delivered" value={report.delivered} />
          <Row label="Rejected" value={report.rejected ?? report.error} />
          <Row label="Requested" value={report.requested} />
          <Row label="Completed" value={report.completed ?? report.success} />
          <Row label="Unanswered" value={report.unanswered} />
          <Row label="Busy" value={report.busy} />
          <Row label="Cancelled" value={report.cancelled} />
          <Row label="Disconnected" value={report.disconnected} />
          <Row label="Failed" value={report.failed} />
          <Row label="Timeout" value={report.timeout} />
          <Row label="Total Records" value={report.total} />
        </div>
      </div>
    )
  }
}

export default AllReportStatusCard;
