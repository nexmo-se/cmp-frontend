import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

import VoltaIcon from "components/VoltaIcon";
import StatsNumber from "pages/CampaignDetailPage/StatsNumber";

const useStyles = makeStyles(() => ({
  normalCursor: { cursor: "unset" },
  overflowHidden: { overflow: "hidden" },
  noMarginPadding: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0
  }, 
  gradient: {
    background: "#348f50",
    background: "linear-gradient(to right, #348f50, #56b4d3)"
  },
  content: { 
    display: "flex",
    alignItems: "center",
  },
  largeIcon: {
    width: 64,
    height: 64,
  },
  dataContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 16
  }
}))

function ReadCard({ report }){
  const mStyles = useStyles();

  return (
    <div 
      className={clsx(
        "Vlt-card",
        mStyles.gradient,
        mStyles.normalCursor,
        mStyles.overflowHidden
      )}
    >
      <div className={clsx("Vlt-card__content", mStyles.content)}>
        <VoltaIcon className={clsx("Vlt-white", mStyles.largeIcon)} icon="Vlt-icon-check-double-bold" />
        <div className={mStyles.dataContainer}>
          <p className={clsx("Vlt-white", mStyles.noMarginPadding)}>READ</p>
          <h4 className={clsx("Vlt-white", mStyles.noMarginPadding)}>
            <StatsNumber left={report?.read} right={report?.totalRecord} />
          </h4>
        </div>
      </div>
    </div>
  )
}
export default ReadCard;