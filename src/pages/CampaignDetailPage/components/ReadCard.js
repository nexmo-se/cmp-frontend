import React from "react";
import { makeStyles } from "@material-ui/core";
import { useSummaryReport } from "../hooks/summary-report";

import StatsNumber from "./StatsNumber";
import StatsCard from "./StatsCard";

const useStyles = makeStyles(() => ({
  gradient: {
    background: "#348f50",
    background: "linear-gradient(to right, #348f50, #56b4d3)"
  }
}))

function ReadCard(){
  const mStyles = useStyles();
  const { report } = useSummaryReport();

  return (
    <StatsCard
      visible={report?.read !== undefined}
      iconName="Vlt-icon-check-double-bold"
      backgroundColor={mStyles.gradient}
      label="READ"
      value={(
        <StatsNumber
          left={report?.read}
          right={report?.totalRecord}
        />
      )}
    />
  )
}

export default ReadCard;
