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

Default.story = { name: "default" }
