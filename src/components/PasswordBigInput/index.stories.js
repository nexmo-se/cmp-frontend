import React from "react";
import storyDecorator from "utils/storyDecorator";
import { withKnobs, text } from "@storybook/addon-knobs";

import PasswordBigInput from "components/PasswordBigInput";

export default {
  title: "components/PasswordBigInput",
  component: PasswordBigInput,
  decorators: [ storyDecorator, withKnobs ]
}

export const Default = () => {
  const placeholder = text("Placeholder", "Password");
  const label = text("Label", "Password");
  const hint = text("Hint", "");
  return <PasswordBigInput placeholder={placeholder} label={label} hint={hint}/>
}

Default.story = { name: "default" }