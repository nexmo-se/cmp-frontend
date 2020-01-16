import React from "react";
import storyDecorator from "utils/storyDecorator";
import { action } from "@storybook/addon-actions";

import LoginForm from "components/LoginForm";

export default { 
  title: "components/LoginForm",
  component: LoginForm,
  decorators: [ storyDecorator ]
}

export const Default = () => {
  const handleLoginClick = action("onLoginClick");
  return <LoginForm onLoginClick={handleLoginClick}/>
}

Default.story = { name: "default" }