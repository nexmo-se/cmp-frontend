import React from "react";

import ErrorProvider from "contexts/error";

import PageContainer from "components/PageContainer";
import SideNavigation from "components/SideNavigation";
import SectionContainer from "components/SectionContainer";
import APIKeyDashboard from "components/APIKeyDashboard";

function APIKeyPage(){
  return (
    <PageContainer>
      <SideNavigation menuActive={{ apiKey: true }}/>
      <SectionContainer>
        <ErrorProvider>
          <APIKeyDashboard/>
        </ErrorProvider>
      </SectionContainer>
    </PageContainer>
  )
}
export default APIKeyPage;