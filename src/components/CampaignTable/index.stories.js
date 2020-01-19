import React from "react";
import storyDecorator from "utils/storyDecorator";

import CampaignTable from "components/CampaignTable";

export default {
  title: "components/CampaignTable",
  component: CampaignTable,
  decorator: [ storyDecorator ]
}

export const Default = () => <CampaignTable/>