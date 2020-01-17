import React from "react";
import voltaIcons from "@vonagevolta/test/dist/symbol/volta-icons.svg";

function NestedMenu(props){
  const { icon, label, children } = props;
  
  return (
    <li>
      <div className="Vlt-sidemenu__trigger Vlt-sidemenu__trigger_active">
        <svg><use xlinkHref={`${voltaIcons}#${icon}`}/></svg>
        <span className="Vlt-sidemenu__label">{label}</span>
      </div>
      <ul>{children}</ul>
    </li>
  )
}
export default NestedMenu;