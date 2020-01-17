import React from "react";

import PageContainer from "components/PageContainer";
import SideNavigation from "components/SideNavigation";
import SectionContainer from "components/SectionContainer";
import ApiKeyDashboard from "components/ApiKeyDashboard";

function ApiKeyPage(props){
  return (
    <PageContainer>
      <SideNavigation menuActive={{ apiKey: true }}/>
      <SectionContainer>
        <ApiKeyDashboard/>
      </SectionContainer>
    </PageContainer>
  )
}
export default ApiKeyPage;