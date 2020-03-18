import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

import ButtonIcon from "components/ButtonIcon";

const useStyles = makeStyles((theme) => ({
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
}))

function Header({ campaign }){
  const classes = useStyles();
  const history = useHistory();

  function handleBackClick(){
    history.goBack();
  }

  return (
    <div className="Vlt-grid">
      <div className={clsx("Vlt-col", classes.headerContainer)}>
        <ButtonIcon icon="Vlt-icon-arrow-left" onClick={handleBackClick} />
        <div className={classes.header}>
          <p className={classes.subheader}>CAMPAIGN</p>
          <h2 className={classes.headerLabel}>{campaign.name}</h2>
        </div>
      </div>
    </div>
  )
}
export default Header;