import React from "react";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";

import VoltaIcon from "components/VoltaIcon";

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
    alignItems: "center"
  },
  largeIcon: {
    width: 64,
    height: 64
  },
  dataContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 16
  }
}))

function TimeTakeCard({ campaign }){
  const [ difference, setDifference ] = React.useState("-");
  const classes = useStyles();

  React.useEffect(() => {
    if(campaign && campaign.actualEndDate){
      const startDate = new moment(campaign.actualStartDate);
      const endDate = new moment(campaign.actualEndDate);
      setDifference(endDate.diff(startDate, "minute", true));
    }
  }, [ campaign ])

  return (
    <div 
      className={clsx(
        "Vlt-card", 
        "Vlt-card--clickable", 
        "Vlt-gradient--gumdrops3",
        classes.normalCursor,
        classes.overflowHidden
      )}
    >
      <div className={clsx("Vlt-card__content", classes.content)}>
        <VoltaIcon className={clsx("Vlt-white", classes.largeIcon)} icon="Vlt-icon-clock" />
        <div className={classes.dataContainer}>
          <p className={clsx("Vlt-white", classes.noMarginPadding)}>TIME TAKEN</p>
          <h4 className={clsx("Vlt-white", classes.noMarginPadding)}>{difference} minutes</h4>
        </div>
      </div>
    </div>
  )
}
export default TimeTakeCard;