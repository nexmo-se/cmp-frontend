import React from "react";
import storyDecorator from "utils/storyDecorator";

import ChannelTable from "components/ChannelTable";

export default { 
  title: "components/ChannelTable",
  component: ChannelTable,
  decorators: [ storyDecorator ]
}

export const Default = () => <ChannelTable/>

Default.story = { name: "default" }