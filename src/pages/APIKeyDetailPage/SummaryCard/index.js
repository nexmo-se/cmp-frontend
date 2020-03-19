import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

import ApplicationSummary from "./ApplicationSummary";
import ChannelSummary from "./ChannelSummary";

const useStyles = makeStyles(() => ({
  borderRight: {
    boxShadow: "inset -1px 0px 1px -1px #9b9da3",
    borderRight: "16px solid transparent"
  }
}))

function SummaryCard({ apiKey }){
  const mStyles = useStyles();
  return (
    <div className="Vlt-card Vlt-card--border">
      <div className="Vlt-grid">
        <div className={clsx("Vlt-col", "Vlt-center", mStyles.borderRight)}>
          <ApplicationSummary applications={apiKey?.applications} />
        </div>
        <div className="Vlt-col Vlt-center">
          <ChannelSummary channels={apiKey?.channels} />
        </div>
      </div>
    </div>
  )
}
export default SummaryCard;
