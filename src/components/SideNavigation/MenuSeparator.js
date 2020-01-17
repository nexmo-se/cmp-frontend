import React from "react";

function MenuSeparator(props){
  const { children } = props;
  return (
    <li>
      <h5 className="Vlt-sidemenu__title ">{children}</h5>
    </li>
  )
}
export default MenuSeparator;