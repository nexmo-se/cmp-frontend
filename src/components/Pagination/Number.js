import React from "react";
import clsx from "clsx";

function Number({ number, onClick, selected=true }){
  return (
    <li className={clsx(
      (selected)? "Vlt-table__pagination__current": ""
    )}>
      <a onClick={onClick}>{number}</a>
    </li>
  )
}
export default Number;
