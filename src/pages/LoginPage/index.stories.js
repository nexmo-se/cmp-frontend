import React from "react";
import storyDecorator from "utils/storyDecorator";
import { action } from "@storybook/addon-actions";

import LoginPage from "pages/LoginPage";

export default {
  title: "pages/LoginPage",
  component: LoginPage,
  decorators: [ storyDecorator ]
}

export const Default = () => {
  const handleLoginClick = action("onLoginClick");
  return <LoginPage onLoginClick={handleLoginClick}/>
}

Default.story = { name: "default" }