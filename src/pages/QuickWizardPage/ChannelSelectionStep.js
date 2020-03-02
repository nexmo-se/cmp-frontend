import React from "react";
import { makeStyles } from "@material-ui/styles";

import Dropdown from "components/Dropdown";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }  
}))

function ChannelSelectionStep({ number, value, setValue }){
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <span className="Vlt-number" data-index={number} />
        <span className="p-large">Select Channel</span>
      </div>
      <Dropdown value={value} setValue={setValue}>
        <option value="sms">SMS</option>
        <option value="social-channel">Social Channel</option>
      </Dropdown>
    </div>
  )
}
export default ChannelSelectionStep;