import React from "react";

import PageContainer from "components/PageContainer";
import SideNavigation from "components/SideNavigation";
import SectionContainer from "components/SectionContainer";
import AddButton from "components/AddButton";
import CampaignTable from "components/CampaignTable";

function CampaignPage(props){
  return (
    <PageContainer>
      <SideNavigation menuActive={{ campaign: true }}/>
      <SectionContainer>
        <div className="Vlt-grid">
          <div className="Vlt-col Vlt-right">
            <AddButton>Add New Campaign</AddButton>
          </div>
        </div>

        <div className="Vlt-grid Vlt-margin--A-top3">
          <div className="Vlt-col">
            <h5>ALL CAMPAIGNS</h5>
          </div>
        </div>

        <div className="Vlt-grid">  
          <div className="Vlt-col">
            <div className="Vlt-card">
              <div className="Vlt-card__content">
                <CampaignTable/>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
export default CampaignPage;