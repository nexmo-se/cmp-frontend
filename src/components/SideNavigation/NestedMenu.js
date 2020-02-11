import React from "react";
import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";

function NestedMenu(props){
  const { icon, label, children } = props;
  const [ expand, setExpand ] = React.useState(false);
  
  const handleMenuClick = () => setExpand((prevExpand) => !prevExpand);

  return (
    <li onClick={handleMenuClick}>
      <div className={`Vlt-sidemenu__trigger ${expand? "Vlt-sidemenu__trigger_active": ""}`}>
        <svg><use xlinkHref={`${voltaIcons}#${icon}`}/></svg>
        <span className="Vlt-sidemenu__label">{label}</span>
      </div>
      <ul>{children}</ul>
    </li>
  )
}
export default NestedMenu;