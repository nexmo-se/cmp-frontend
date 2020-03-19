import React from "react";
import moment from "moment";

import useUser from "hooks/user";
import useCampaign from "hooks/campaign";

import Row from "./Row";
import StatusText from "./StatusText";

function CampaignDetailCard({ campaign }){
  const [ lastStatusUpdate, setLastStatusUpdate ] = React.useState("");
  const [ report, setReport ] = React.useState(null);
  const mUser = useUser();
  const mCampaign = useCampaign(mUser.token);
  
  async function fetchReport(){
    const report = await mCampaign.summaryReport(campaign);
    setReport(report);
  }

  React.useEffect(() => {
    fetchReport();
    const lastStatusUpdate = new moment(campaign?.statusTime).fromNow();
    setLastStatusUpdate(lastStatusUpdate);
  }, [ campaign ]);

  return (
    <div className="Vlt-card">
      <div className="Vlt-card__header">
        <h4>Campaign Detail</h4>
      </div>
      <div className="Vlt-card__content">
        <Row label="Status">
          <StatusText status={campaign?.status} />
        </Row>
        <Row label="Last Status Update">{lastStatusUpdate}</Row>
        <Row label="Start Date">{new moment(campaign?.campaignStartDate).format("DD MMMM YYYY")}</Row>
        <Row label="Start Time">{new moment(campaign?.campaignStartDate).format("hh:mm")}</Row>
        <Row label="End Date">{new moment(campaign?.campaignEndDate).format("DD MMMM YYYY")}</Row>
        <Row label="End Time">{new moment(campaign?.campaignEndDate).format("hh:mm")}</Row>
        <Row label="Total Recipients">{report?.totalRecord.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Row>
      </div>
    </div>
  )
}
export default CampaignDetailCard;