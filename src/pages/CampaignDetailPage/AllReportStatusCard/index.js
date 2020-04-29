import React from "react";
import Row from "./Row";

function AllReportStatusCard({ report }){

  return (
    <div className="Vlt-card Vlt-card--border">
      <div className="Vlt-card__header">
        <h4>Summary Status</h4>
      </div>
      <div className="Vlt-card__content">
        <Row label="Submitted">{report?.submitted.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Row>
        <Row label="Read">{report?.read.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Row>
        <Row label="Delivered">{report?.delivered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Row>
        <Row label="Rejected">{report?.rejected.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Row>
        <Row label="Total Messages">{report?.totalRecord.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Row>
      </div>
    </div>
  )
}
export default AllReportStatusCard;