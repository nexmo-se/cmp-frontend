import React from "react";
import storyDecorator from "utils/storyDecorator";

import SideNavigation from "components/SideNavigation";

export default {
  title: "components/SideNavigation",
  component: SideNavigation,
  decorators: [ storyDecorator ]
}

export const Default = () => <SideNavigation/>

Default.story = { name: "default" }