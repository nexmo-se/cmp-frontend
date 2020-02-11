import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";
import React from "react";

import TableColumn from "./TableColumn";

function DetailColumn(){
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <button className="Vlt-btn Vlt-btn--tertiary Vlt-btn--icon">
        <svg>
          <use xlinkHref={`${voltaIcons}#Vlt-icon-gear`} />
        </svg>
      </button>
    </TableColumn>
  )
}
export default DetailColumn