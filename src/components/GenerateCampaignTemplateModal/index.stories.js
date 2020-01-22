import React from "react";
import storyDecorator from "utils/storyDecorator";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";

import GenerateCampaignTemplateModal from "components/GenerateCampaignTemplateModal";

export default {
  title: "components/GenerateCampaignTemplateModal",
  component: GenerateCampaignTemplateModal,
  decorators: [ storyDecorator, withKnobs ]
}

export const Default = () => {
  const options = [{ value: "232d27d5-0db8-46cf-8c0f-6d2c751cd4c2", label: "Delivery Template" }];
  const visible = boolean("Visible?", true, "GenerateCampaignTemplateModal");
  const toSelect = select("To Select?", [ "template", "campaign" ], "template", "GenerateCampaignTemplateModal")
  const handleCancelClick = action("onCancelClick");
  const handleGenerateDownloadClick = action("onGenerateDownloadClick");

  return (
    <GenerateCampaignTemplateModal 
      onCancelClick={handleCancelClick} onGenerateDownloadClick={handleGenerateDownloadClick}
      visible={visible} toSelect={toSelect} options={options}/>
  )
}

Default.story = { name: "default" }