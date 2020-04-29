import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

import VoltaIcon from "components/VoltaIcon";
import StatsNumber from "pages/CampaignDetailPage/StatsNumber";
import { UserContext } from "contexts/user";

const useStyles = makeStyles(() => ({
  normalCursor: { cursor: "unset" },
  overflowHidden: { overflow: "hidden" },
  noMarginPadding: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0
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

function DeliveryCard({ report }){
  const mStyles = useStyles();

  return (
    <div 
      className={clsx(
        "Vlt-card", 
        "Vlt-card--clickable",
        "Vlt-gradient--blue-to-purple", 
        mStyles.normalCursor,
        mStyles.overflowHidden
      )}
    >
      <div className={clsx("Vlt-card__content", mStyles.content)}>
        <VoltaIcon className={clsx("Vlt-white", mStyles.largeIcon)} icon="Vlt-icon-check-bold" />
        <div className={mStyles.dataContainer}>
          <p className={clsx("Vlt-white", mStyles.noMarginPadding)}>DELIVERED</p>
          <h4 className={clsx("Vlt-white", mStyles.noMarginPadding)}>
            <StatsNumber left={report?.delivered} right={report?.totalRecord} />
          </h4>
        </div>
      </div>
    </div>
  )
}
export default DeliveryCard;