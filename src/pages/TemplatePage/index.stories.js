import React from "react";
import storyDecorator from "utils/storyDecorator";

import TempaltePage from "pages/TemplatePage";

export default {
  title: "pages/TemplatePage",
  component: TempaltePage,
  decoratos: [ storyDecorator ]
}

export const Default = () => <TempaltePage/>

Default.story = { name: "default" }