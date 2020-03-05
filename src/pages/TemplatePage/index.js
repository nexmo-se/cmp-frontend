import React from "react";
import uuid from "uuid/v4";

import PageContainer from "components/PageContainer";
import SideNavigation from "components/SideNavigation";
import SectionContainer from "components/SectionContainer";
import AddButton from "components/AddButton";
import TemplateTable from "components/TemplateTable";
import AddTemplateModal from "components/AddTemplateModal";

function TemplatePage(){
  const [ refreshToken, setRefreshToken ] = React.useState(null);
  const [ visible, setVisible ] = React.useState(false);

  function handleToggleModal(){
    setVisible(true);
  }

  function handleAdded(){
    setRefreshToken(uuid());
  }

  return (
    <React.Fragment>
      <PageContainer>
        <SideNavigation menuActive={{ template: true }}/>
        <SectionContainer>

          <div className="Vlt-grid">
            <div className="Vlt-col Vlt-right">
              <AddButton onClick={handleToggleModal}>Add New Template</AddButton>
            </div>
          </div>

          <div className="Vlt-grid">
            <div className="Vlt-col">
              <h5>ALL TEMPLATES</h5>
            </div>
          </div>

          <div className="Vlt-grid">
            <div className="Vlt-col">
              <TemplateTable refreshToken={refreshToken} setRefreshToken={setRefreshToken} />
            </div>
          </div>
        </SectionContainer>
      </PageContainer>
      <AddTemplateModal 
        visible={visible} 
        setVisible={setVisible} 
        onAdded={handleAdded} 
      />
    </React.Fragment>
  )
}
export default TemplatePage;