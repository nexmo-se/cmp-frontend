import React from "react";
import storyDecorator from "utils/storyDecorator";

import APIKeyPage from "pages/APIKeyPage";

export default {
  title: "pages/APIKeyPage",
  component: APIKeyPage,
  decorators: [ storyDecorator ]
}

export const Default = () => <APIKeyPage/>

Default.story = { name: "default" }
