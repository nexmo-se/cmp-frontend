import React from "react";

import { UserContext } from "contexts/user";

export default function useUser(){
  return React.useContext(UserContext);
}