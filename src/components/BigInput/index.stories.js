import React from "react";
import storyDecorator from "utils/storyDecorator";
import { withKnobs, text } from "@storybook/addon-knobs";

import BigInput from "components/BigInput";

export default {
  title: "components/BigInput",
  component: BigInput,
  decorators: [ storyDecorator, withKnobs ]
}

export const Default = () => {
  const placeholder = text("Placeholder", "frans.siswanto@vonage.com");
  const label = text("Label", "Username");
  const hint = text("Hint", "");
  return <BigInput placeholder={placeholder} label={label} hint={hint}/>
}

Default.story = { name: "default" }