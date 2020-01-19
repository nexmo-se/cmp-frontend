import React from "react";
import storyDecorator from "utils/storyDecorator";

import CampaignPage from "pages/CampaignPage";

export default { 
  title: "pages/CampaignPage",
  component: CampaignPage,
  decorators: [ storyDecorator ]
}

export const Default = () => <CampaignPage/>

Default.story = { name: "default" }