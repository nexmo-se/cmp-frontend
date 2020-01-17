import React from "react";
import storyDecorator from "utils/storyDecorator";

import ApiKeyPage from "pages/ApiKeyPage";
import PageContainer from "components/PageContainer";
import SideNavigation from "components/SideNavigation";
import SectionContainer from "components/SectionContainer";
import ApiKeyDashboard from "components/ApiKeyDashboard";

export default {
  title: "pages/ApiKeyPage",
  component: ApiKeyPage,
  decorators: [ storyDecorator ]
}

export const Default = () => <ApiKeyPage/>
export const WithDummyData = () => {
  return(
    <PageContainer>
      <SideNavigation menuActive={{ apiKey: true }}/>
      <SectionContainer>
        <ApiKeyDashboard dummy={true}/>
      </SectionContainer>
    </PageContainer>
  )
}

Default.story = { name: "default" }
WithDummyData.story = { name: "With Dummy Data" }