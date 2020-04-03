import React from "react";
import clsx from "clsx";
import uuid from "uuid/v4";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  flexCenter: {
    display: "flex",
    alignItems: "center"
  },
  title: { marginBottom: 0 }
}))

function Header(){
  const mStyles = useStyles();

  return (
      <div className="Vlt-grid">
      <div className="Vlt-col">
        <h1 className={mStyles.title}>Reports</h1>
      </div>
    </div>
  )
}
export default Header;