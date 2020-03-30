import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

import ButtonIcon from "components/ButtonIcon";
import useStyles from "./styles";

function Header({ title, name, rightComponent }){
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
          <p className={mStyles.subheader}>{title.toUpperCase()}</p>
          <h2 className={mStyles.headerLabel}>{name}</h2>
        </div>
      </div>
      <div className={clsx("Vlt-col", mStyles.rightContainer)}>
        {rightComponent}
      </div>
    </div>
  )
}
export default Header;