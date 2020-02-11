import React from "react";

import ErrorProvider from "contexts/error";

import PageContainer from "components/PageContainer";
import SideNavigation from "components/SideNavigation";
import SectionContainer from "components/SectionContainer";
import ApiKeyDashboard from "components/ApiKeyDashboard";

function APIKeyPage(){
  return (
    <PageContainer>
      <SideNavigation menuActive={{ apiKey: true }}/>
      <SectionContainer>
        <ErrorProvider>
          <ApiKeyDashboard/>
        </ErrorProvider>
      </SectionContainer>
    </PageContainer>
  )
}
export default APIKeyPage;