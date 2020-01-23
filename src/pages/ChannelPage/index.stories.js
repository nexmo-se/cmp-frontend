import React from "react";
import storyDecorator from "utils/storyDecorator";

import ChannelPage from "pages/ChannelPage";

export default {
  title: "pages/ChannelPage",
  component: ChannelPage,
  decorators: [ storyDecorator ]
}

export const Default = () => <ChannelPage/>

Default.story = { name: "default" }