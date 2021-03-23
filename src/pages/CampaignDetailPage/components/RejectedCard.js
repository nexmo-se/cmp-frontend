import React from "react";
import { useSummaryReport } from "../hooks/summary-report";

import StatsNumber from "./StatsNumber";
import StatsCard from "./StatsCard";

function RejectedCard () {
  const { report } = useSummaryReport();

  return (
    <StatsCard
      visible={report?.rejected !== undefined}
      iconName="Vlt-icon-cross-circle"
      backgroundColor="Vlt-gradient--pink-to-peach"
      label="REJECTED"
      value={(
        <StatsNumber
          left={report?.rejected}
          right={report?.total}
        />
      )}
    />
  )
}

export default RejectedCard;
