// @flow
import React from "react";

export const SummaryContext = React.createContext({});

// We assume, only 4 statistic will be displayed in the dashboard
function SummaryStats ({ children, report }) {
  return (
    <SummaryContext.Provider
      value={{ report }}
    >
      <div className={"Vlt-grid"}>
        {children}
      </div>
    </SummaryContext.Provider>
  )
}

export default SummaryStats;
