import React from "react";

import PageContainer from "components/PageContainer";
import SideNavigation from "components/SideNavigation";
import SectionContainer from "components/SectionContainer";

function DashboardPage(props){
  return (
    <PageContainer>
      <SideNavigation/>
      <SectionContainer>
        <div className="Vlt-grid">
          <div className="Vlt-col">
            <h5>RUNNING CAMPAIGN</h5>
          </div>
        </div>
      </SectionContainer>
    </PageContainer>
  );
}
export default DashboardPage;