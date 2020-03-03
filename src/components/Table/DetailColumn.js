import React from "react";

import TableColumn from "components/Table/TableColumn";
import DetailButton from "components/Table/DetailButton";

function DetailColumn({ onDeleteClick, onDeleted }){
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <DetailButton />
    </TableColumn>
  )
}
export default DetailColumn