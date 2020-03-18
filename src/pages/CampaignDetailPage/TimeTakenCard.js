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
  const [ duration, setDuration ] = React.useState("-");
  const [ durationString, setDurationString ] = React.useState("");
  const classes = useStyles();

  React.useEffect(() => {
    let duration = campaign?.actualDuration / 60;
    let durationString = "minutes";
    if(duration > 60){
      duration = duration / 60;
      durationString = "hours";
      if(duration > 24){
        duration = duration / 24;
        durationString = "days";
        if(duration > 7 ){
          duration = duration / 7;
          durationString = "weeks";
        }
      }
    }
    setDuration(duration.toFixed(2));
    setDurationString(durationString);
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
        <h4 className={clsx("Vlt-white", classes.noMarginPadding)}>{duration} {durationString}</h4>
        </div>
      </div>
    </div>
  )
}
export default TimeTakeCard;