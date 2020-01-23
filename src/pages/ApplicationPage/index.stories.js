import React from "react";
import storyDecorator from "utils/storyDecorator";

import ApplicationPage from "pages/ApplicationPage";

export default { 
  title: "pages/ApplicationPage",
  component: ApplicationPage,
  decorators: [ storyDecorator ]
}

export const Default = () => <ApplicationPage/>