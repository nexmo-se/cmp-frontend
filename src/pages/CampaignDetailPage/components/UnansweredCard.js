import React from "react";
import { useSummaryReport } from "../hooks/summary-report";

import StatsNumber from "./StatsNumber";
import StatsCard from "./StatsCard";

function UnansweredCard () {
  const { report } = useSummaryReport();

  return (
    <StatsCard
      visible={report?.unanswered !== undefined}
      iconName="Vlt-icon-cross-circle"
      backgroundColor="Vlt-gradient--pink-to-peach"
      label="UNANSWERED"
      value={(
        <StatsNumber
          left={report?.unanswered}
          right={report?.total}
        />
      )}
    />
  )
}

export default UnansweredCard;
