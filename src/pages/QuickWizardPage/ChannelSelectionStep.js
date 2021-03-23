// @flow
import React from "react";
import { makeStyles } from "@material-ui/styles";

import Dropdown from "components/Dropdown";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dropdown: { width: "35%" }
}))

interface ChannelSelectionStepProps {
  number: number;
  value: string;
  setValue: (value: string) => void;
}

function ChannelSelectionStep ({ number, value, setValue }: ChannelSelectionStepProps) {
  const mStyles = useStyles();

  return (
    <div className={mStyles.container}>
      <div>
        <span className="Vlt-number" data-index={number} />
        <span className="p-large">Select Funnel</span>
      </div>
      <Dropdown 
        className={mStyles.dropdown}
        value={value} 
        setValue={setValue}
      >
        <option value="sms">SMS</option>
        <option value="voice">Voice</option>
        <option value="social-channel">Social Channel</option>
      </Dropdown>
    </div>
  )
}
export default ChannelSelectionStep;