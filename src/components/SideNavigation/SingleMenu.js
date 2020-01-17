import React from "react";
import voltaIcons from "@vonagevolta/test/dist/symbol/volta-icons.svg";

function SingleMenu(props){
  const { icon, label } = props;
  return (
    <li>
      <span className="Vlt-sidemenu__link">
        <svg><use xlinkHref={`${voltaIcons}#${icon}`}/></svg>
        <span className="Vlt-sidemenu__label">{label}</span>
      </span>
    </li>
  )
}
export default SingleMenu;