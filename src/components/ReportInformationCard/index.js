import React from "react";
import { Link } from "react-router-dom";

function ReportInformationCard(){
  return (
    <div className="Vlt-card--gradient-wrapper Vlt-gradient--blue-to-pink">
      <div className="Vlt-card Vlt-card--border">
        <div className="Vlt-card__content">
          <p>REPORTS</p>
          <h4>
            <b>Learn how you can generate your reports.</b>
          </h4>
          <p>To generate a template, you need open any completed campaign and click <code>Export Detail Report</code> button.</p>
          <br />
          <Link className="Vlt-text-link" to="/campaigns">
            See Campaigns
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ReportInformationCard;
