import React from "react";
import { useParams } from "react-router-dom";

import Campaign from "entities/campaign";
import useCampaign from "hooks/campaign";
import { UserContext } from "contexts/user";

import CampaignDetailCard from "components/CampaignDetailCard";
import DeliveredCampaignChart from "components/DeliveredCampaignChart";
import CampaignAuditLogCard from "components/CampaignAuditLogCard";

import Header from "pages/CampaignDetailPage/Header";
import SummaryStats from "pages/CampaignDetailPage/SummaryStats";

function CampaignDetailPage(){
  const [ campaign, setCampaign ] = React.useState();
  const { campaignId } = useParams();
  const { token } = React.useContext(UserContext);
  const mCampaign = useCampaign(token);

  async function fetchData(){
    const c = await mCampaign.retrieve(Campaign.fromID(campaignId));
    setCampaign(c);
  }

  React.useEffect(() => {
    fetchData();
  }, [ campaignId ])

  if(!campaign) return null;
  return (
    <React.Fragment>
      <Header campaign={campaign} />
      <SummaryStats campaign={campaign} />
      <div className="Vlt-grid">
        <div className="Vlt-col">
          <CampaignDetailCard campaign={campaign} />
          <CampaignAuditLogCard campaign={campaign} />
        </div>
        <div className="Vlt-col Vlt-col--2of3">
          <DeliveredCampaignChart campaign={campaign}/>
        </div>
      </div>
    </React.Fragment>
  )
}
export default CampaignDetailPage;