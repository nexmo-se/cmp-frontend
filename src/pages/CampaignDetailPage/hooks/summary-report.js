import React from "react";
import { SummaryContext } from "../components/SummaryStats";

export function useSummaryReport () {
  return React.useContext(SummaryContext)
};
