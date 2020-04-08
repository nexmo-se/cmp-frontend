import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";

import React from "react";
import { useHistory } from "react-router-dom";

function SingleMenu({ icon, label, active, to, onClick }){
  const history = useHistory();

  function handleClick(){
    if(to) history.push(to);
    if(onClick) onClick();
  }

  return (
    <li onClick={handleClick}>
      <span className={`Vlt-sidemenu__link ${active? "Vlt-sidemenu__link_active": ""}`}>
        <svg><use xlinkHref={`${voltaIcons}#${icon}`}/></svg>
        <span className="Vlt-sidemenu__label">{label}</span>
      </span>
    </li>
  )
}
export default SingleMenu;