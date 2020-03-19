import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

import ButtonIcon from "components/ButtonIcon";
import Button from "components/Button";

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
}))

function Header({ apiKey }){
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
          <p className={classes.subheader}>API KEY</p>
          <h2 className={classes.headerLabel}>{apiKey?.name}</h2>
        </div>
      </div>
      <div className="Vlt-col Vlt-right">
        <Button type="tertiary">Edit</Button>
      </div>
    </div>
  )
}
export default Header;