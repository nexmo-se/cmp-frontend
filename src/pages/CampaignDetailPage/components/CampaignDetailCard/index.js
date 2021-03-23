// @flow
import React from "react";
import moment from "moment";

import Report from "entities/report";
import Campaign from "entities/campaign";

import Row from "./Row";
import StatusText from "./StatusText";

interface CampaignDetailCardProps {
  report: Report;
  campaign: Campaign;
}

function CampaignDetailCard({ report, campaign }){
  const [ lastStatusUpdate, setLastStatusUpdate ] = React.useState("");

  React.useEffect(
    () => {
      const lastStatusUpdate = new moment(campaign?.statusTime).fromNow();
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
            <StatusText status={campaign?.status} />
          </Row>
          <Row label="Last Status Update">{lastStatusUpdate}</Row>
          <Row label="Start Date">{new moment(campaign?.campaignStartDate).format("DD MMMM YYYY")}</Row>
          <Row label="Start Time">{new moment(campaign?.campaignStartDate).format("HH:mm")}</Row>
          <Row label="End Date">{new moment(campaign?.campaignEndDate).format("DD MMMM YYYY")}</Row>
          <Row label="End Time">{new moment(campaign?.campaignEndDate).format("HH:mm")}</Row>
          <Row label="Total Messages">{report?.total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Row>
          <Row label="Total Cost">EUR {report?.price.toFixed(5)}</Row>
        </div>
      </div>
    )
  }
}
export default CampaignDetailCard;