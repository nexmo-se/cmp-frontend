import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

import ButtonIcon from "components/ButtonIcon";
import EditButton from "./EditButton";

const useStyles = makeStyles(() => ({
  subheader: { marginBottom: 0 },
  headerLabel: { 
    paddingTop: 0,
    marginBottom: 0
  },
  header: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 16
  },
  headerContainer: { 
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 24
  },
  rightContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 24
  }
}))

function Header({ apiKey, setRefreshToken }){
  const mStyles = useStyles();
  const history = useHistory();

  function handleBackClick(){
    history.goBack();
  }

  return (
    <div className="Vlt-grid">
      <div className={clsx("Vlt-col", mStyles.headerContainer)}>
        <ButtonIcon icon="Vlt-icon-arrow-left" onClick={handleBackClick} />
        <div className={mStyles.header}>
          <p className={mStyles.subheader}>API KEY</p>
          <h2 className={mStyles.headerLabel}>{apiKey?.name}</h2>
        </div>
      </div>
      <div className={clsx("Vlt-col", mStyles.rightContainer)}>
        <EditButton apiKey={apiKey} setRefreshToken={setRefreshToken} />
      </div>
    </div>
  )
}
export default Header;