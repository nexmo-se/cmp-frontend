import React from "react";
import { makeStyles } from "@material-ui/styles";

import Button from "components/Button";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  button: { width: "35%" }
}))

function Step({ number, label, buttonLabel, onClick }){
  const mStyles = useStyles();

  return (
    <div className={mStyles.container}>
      <div>
        <span className="Vlt-number" data-index={number} />
        <span className="p-large">{label}</span>
      </div>
      <Button 
        type="tertiary" 
        onClick={onClick}
        className={mStyles.button}
      >
        {buttonLabel}
      </Button>
    </div>
  )
}
export default Step;