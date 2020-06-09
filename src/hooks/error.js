// @flow
import React from "react";
import { ErrorContext } from "contexts/error";

export default function useError(){
  return React.useContext(ErrorContext);
}