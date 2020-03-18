import React from "react";
import { useParams } from "react-router-dom";

import Campaign from "entities/campaign";
import useCampaign from "hooks/campaign";
import { UserContext } from "contexts/user";

import PageContainer from "components/PageContainer";
import SideNavigation from "components/SideNavigation";
import SectionContainer from "components/SectionContainer";

import Header from "pages/CampaignDetailPage/Header";
import SummaryStats from "pages/CampaignDetailPage/SummaryStats";
import AuditLogsTable from "pages/CampaignDetailPage/AuditLogsTable";

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

  return (
    <PageContainer>
      <SideNavigation menuActive={{ campaign: true }} />
      {(!campaign)? null:(
        <SectionContainer>
          <Header campaign={campaign} />
          <SummaryStats campaign={campaign} />
          <div className="Vlt-grid">
            <div className="Vlt-col">
              <div className="Vlt-card">
                <div className="Vlt-card__header">
                  <h4>Audit Logs</h4>
                </div>
                <div className="Vlt-card__content">
                  <AuditLogsTable campaign={campaign} />
                </div>
              </div>
            </div>
            <div className="Vlt-col" />
          </div>
        </SectionContainer>
      )}
    </PageContainer>
  )
}
export default CampaignDetailPage;