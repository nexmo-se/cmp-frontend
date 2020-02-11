import React from "react";

import PageContainer from "components/PageContainer";
import SideNavigation from "components/SideNavigation";
import SectionContainer from "components/SectionContainer";
import AddButton from "components/AddButton";
import TemplateTable from "components/TemplateTable";

function TemplatePage(){
  return (
    <PageContainer>
      <SideNavigation menuActive={{ template: true }}/>
      <SectionContainer>

        <div className="Vlt-grid">
          <div className="Vlt-col Vlt-right">
            <AddButton>Add New Template</AddButton>
          </div>
        </div>

        <div className="Vlt-grid">
          <div className="Vlt-col">
            <h5>ALL TEMPLATES</h5>
          </div>
        </div>

        <div className="Vlt-grid">
          <div className="Vlt-col">
            <TemplateTable/>
          </div>
        </div>
      </SectionContainer>
    </PageContainer>
  )
}
export default TemplatePage;