import React from "react";
import uuid from "uuid/v4";

import PageContainer from "components/PageContainer";
import SideNavigation from "components/SideNavigation";
import SectionContainer from "components/SectionContainer";
import AddButton from "components/AddButton";
import CampaignTable from "components/CampaignTable";
import AddCampaignModal from "components/AddCampaignModal";

function CampaignPage(){
  const [ visible, setVisible ] = React.useState(false);
  const [ refreshToken, setRefreshToken ] = React.useState(null);

  function handleAdded(){
    setRefreshToken(uuid());
  }

  function handleToggleModal(){
    setVisible((prevVisible) => !prevVisible);
  }
  
  return (
    <React.Fragment>
      <PageContainer>
        <SideNavigation menuActive={{ campaign: true }}/>
        <SectionContainer>
          <div className="Vlt-grid">
            <div className="Vlt-col Vlt-right">
              <AddButton onClick={handleToggleModal}>Add New Campaign</AddButton>
            </div>
          </div>

          <div className="Vlt-grid Vlt-margin--A-top3">
            <div className="Vlt-col">
              <h5>ALL CAMPAIGNS</h5>
            </div>
          </div>

          <div className="Vlt-grid">  
            <div className="Vlt-col">
              <CampaignTable refreshToken={refreshToken}/>
            </div>
          </div>
        </SectionContainer>
      </PageContainer>
      <AddCampaignModal visible={visible} setVisible={setVisible} onAdded={handleAdded} />
    </React.Fragment>
  );
}
export default CampaignPage;