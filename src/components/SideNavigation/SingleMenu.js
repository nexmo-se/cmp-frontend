import React from "react";
import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";

function SingleMenu(props){
  const { icon, label, active } = props;

  return (
    <li>
      <span className={`Vlt-sidemenu__link ${active? "Vlt-sidemenu__link_active": ""}`}>
        <svg><use xlinkHref={`${voltaIcons}#${icon}`}/></svg>
        <span className="Vlt-sidemenu__label">{label}</span>
      </span>
    </li>
  )
}
export default SingleMenu;