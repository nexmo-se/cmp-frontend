import React from "react";

import ApiKeyDashboard from "components/ApiKeyDashboard";
import SideNavigation from "components/SideNavigation";
import SectionContainer from "components/SectionContainer";
import PageContainer from "components/PageContainer";

export default {
  title: "components/ApiKeyDashboard",
  component: ApiKeyDashboard,
}

export const Default = () => {
  return (
    <SectionContainer>
      <ApiKeyDashboard/>
    </SectionContainer>
  )
}

Default.story = { name: "default" }