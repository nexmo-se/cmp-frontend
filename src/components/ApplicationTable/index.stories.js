import React from "react";
import storyDecorator from "utils/storyDecorator";

import ApplicationTable from "components/ApplicationTable";

export default {
  title: "components/ApplicationTable",
  component: ApplicationTable,
  decorators: [ storyDecorator ]
}

export const Default = () => <ApplicationTable/>