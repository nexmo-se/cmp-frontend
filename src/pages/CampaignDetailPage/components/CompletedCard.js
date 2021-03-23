import React from "react";
import { useSummaryReport } from "../hooks/summary-report";

import StatsNumber from "./StatsNumber";
import StatsCard from "./StatsCard";

function CompletedCard () {
  const { report } = useSummaryReport();
  console.log(report);
  
  return (
    <StatsCard
      visible={report?.completed !== undefined}
      iconName="Vlt-icon-check-bold"
      backgroundColor="Vlt-gradient--blue-to-purple"
      label="COMPLETED"
      value={(
        <StatsNumber
          left={report?.completed}
          right={report?.total}
        />
      )}
    />
  )
}

export default CompletedCard;
