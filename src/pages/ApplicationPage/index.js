import React from "react";

import PageContainer from "components/PageContainer";
import SideNavigation from "components/SideNavigation";
import AddButton from "components/AddButton";
import SectionContainer from "components/SectionContainer";
import ApplicationTable from "components/ApplicationTable";

function ApplicationPage(props){
  return (
    <PageContainer>
      <SideNavigation menuActive={{ application: true }}/>
      <SectionContainer>
        <div className="Vlt-grid">
          <div className="Vlt-col Vlt-right">
            <AddButton>Add New Application</AddButton>
          </div>
        </div>

        <div className="Vlt-grid">
          <div className="Vlt-col">
            <h5>ALL APPLICATIONS</h5>
          </div>
        </div>

        <div className="Vlt-grid">
          <div className="Vlt-col">
            <ApplicationTable/>
          </div>
        </div>
      </SectionContainer>
    </PageContainer>
  )
}
export default ApplicationPage;