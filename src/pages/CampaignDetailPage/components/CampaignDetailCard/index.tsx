import { DateTime } from "luxon";

import { useReportData } from "../SummaryReport";
import { useState, useEffect } from "react";

import Row from "./components/Row";
import StatusText from "./components/StatusText";

function CampaignDetailCard () {
  const [lastStatusUpdate, setLastStatusUpdate] = useState<string>("");
  const { campaign, report } = useReportData();

  useEffect(
    () => {
      if (!campaign) return;
      if (!campaign.statusTime) return;

      const lastStatusUpdate = campaign.statusTime.toRelative();
      setLastStatusUpdate(lastStatusUpdate);
    },
    [campaign]
  );

  if (!report || !campaign) return null;
  else {
    return (
      <div className="Vlt-card Vlt-card--border">
        <div className="Vlt-card__header">
          <h4>Campaign Detail</h4>
        </div>
        <div className="Vlt-card__content">
          <Row label="Status">
            <StatusText status={campaign.status} />
          </Row>
          <Row label="Last Status Update">{lastStatusUpdate}</Row>
          <Row label="Start Date">
            {campaign.campaignStartDate.toLocaleString(DateTime.DATE_FULL)}
          </Row>
          <Row label="Start Time">
            {campaign.campaignStartDate.toLocaleString(DateTime.TIME_24_SIMPLE)}
          </Row>
          <Row label="End Date">
            {campaign.campaignEndDate.toLocaleString(DateTime.DATE_FULL)}
          </Row>
          <Row label="End Time">
            {campaign.campaignEndDate.toLocaleString(DateTime.TIME_24_SIMPLE)}
          </Row>
          <Row label="Total Messages">
            {report.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Row>
          <Row label="Total Cost">
            EUR {report.price.toFixed(5)}
          </Row>
        </div>
      </div>
    )
  }
}

export default CampaignDetailCard;
