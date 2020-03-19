import React from "react";
import { makeStyles } from "@material-ui/styles";

import Spinner from "components/Spinner";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  }
}))

function FullPageSpinner(){
  const mStyles = useStyles();

  return (
    <div className={mStyles.container}>
      <Spinner />
    </div>
  )
}
export default FullPageSpinner;