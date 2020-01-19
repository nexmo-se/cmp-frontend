import React from "react";

import ApiKeyDashboard from "components/ApiKeyDashboard";
import SectionContainer from "components/SectionContainer";

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