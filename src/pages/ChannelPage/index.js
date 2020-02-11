import React from "react";

import PageContainer from "components/PageContainer";
import SideNavigation from "components/SideNavigation";
import SectionContainer from "components/SectionContainer";
import AddButton from "components/AddButton";
import ChannelTable from "components/ChannelTable";

function ChannelPage(props){
  return (
    <PageContainer>
      <SideNavigation menuActive={{ channel: true }}/>
      <SectionContainer>
        
        <div className="Vlt-grid">
          <div className="Vlt-col Vlt-right">
            <AddButton>Add New Channel</AddButton>
          </div>
        </div>

        <div className="Vlt-grid">
          <div className="Vlt-col">
            <h5>ALL CHANNELS</h5>
          </div>
        </div>

        <div className="Vlt-grid">
          <div className="Vlt-col">
            <ChannelTable/>
          </div>
        </div>

      </SectionContainer>
    </PageContainer>
  )
}
export default ChannelPage;