import React from "react";
import uuid from "uuid/v4";

import PageContainer from "components/PageContainer";
import SideNavigation from "components/SideNavigation";
import SectionContainer from "components/SectionContainer";
import AddButton from "components/AddButton";
import ChannelTable from "components/ChannelTable";
import AddChannelModal from "components/AddChannelModal";

function ChannelPage(){
  const [ visible, setVisible ] = React.useState(false);
  const [ refreshToken, setRefreshToken ] = React.useState(null);

  function handleToggleModal(){
    setVisible(true)
  }

  function handleAdded(){
    setRefreshToken(uuid());
  }

  return (
    <React.Fragment>
      <PageContainer>
        <SideNavigation menuActive={{ channel: true }}/>
        <SectionContainer>
          
          <div className="Vlt-grid">
            <div className="Vlt-col Vlt-right">
              <AddButton onClick={handleToggleModal}>Add New Channel</AddButton>
            </div>
          </div>

          <div className="Vlt-grid">
            <div className="Vlt-col">
              <h5>ALL CHANNELS</h5>
            </div>
          </div>

          <div className="Vlt-grid">
            <div className="Vlt-col">
              <ChannelTable refreshToken={refreshToken}/>
            </div>
          </div>

        </SectionContainer>
      </PageContainer>
      <AddChannelModal visible={visible} setVisible={setVisible} onAdded={handleAdded} />
    </React.Fragment>
  )
}
export default ChannelPage;