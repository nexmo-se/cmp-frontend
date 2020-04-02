import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { useLocation } from "react-router-dom";

import Button from "components/Button";
import ChannelDropdown from "components/ChannelDropdown";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center"
  },
  card: { width: "50%" }
}))

function ChannelSelection(){
  const mStyles = useStyles();

  return (
    <div className={mStyles.container}>
      <div className={clsx(
        "Vlt-card",
        "Vlt-elevation--4",
        mStyles.card
      )}>
        <div className="Vlt-card__header">
          <h3>Please Select Channel</h3>
        </div>
        <div className="Vlt-card__content">
          <p>This channel will determine the next action for your template creation. Please select the channel properly.</p>
          <ChannelDropdown />
        </div>
        <div className="Vlt-card__footer Vlt-right">
          <Button type="secondary">Next</Button>
        </div>
      </div>
    </div>
  )
}
export default ChannelSelection;
