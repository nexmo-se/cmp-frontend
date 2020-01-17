import React from "react";
import storyDecorator from "utils/storyDecorator";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import SubmitButton from "components/SubmitButton";

export default {
  title: "components/SubmitButton",
  component: SubmitButton,
  decorators: [ storyDecorator, withKnobs ]
}

export const Default = () => {
  const loading = boolean("Loading", false, "SubmitButton");
  return <SubmitButton loading={loading}>Add New API Key</SubmitButton>
}