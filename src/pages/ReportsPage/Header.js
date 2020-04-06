import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { v4 as uuid } from "uuid";

import RefreshButton from "components/RefreshButton";

const useStyles = makeStyles(() => ({
  flexCenter: {
    display: "flex",
    alignItems: "center"
  },
  title: { marginBottom: 0 },
  right: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
  }
}))

function Header({ setRefreshToken }){
  const mStyles = useStyles();

  function handleRefresh(){
    setRefreshToken(uuid());
  }

  return (
      <div className="Vlt-grid">
      <div className="Vlt-col">
        <h1 className={mStyles.title}>Reports</h1>
      </div>
      <div className={clsx(
        "Vlt-col",
        mStyles.right
      )}>
        <RefreshButton onClick={handleRefresh} />
      </div>
    </div>
  )
}
export default Header;