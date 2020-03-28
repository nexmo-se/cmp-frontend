import React from "react";

import TableColumn from "components/Table/TableColumn";
import DeleteButton from "./DeleteButton";

function DetailColumn({ template, setRefreshToken }){
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <DeleteButton template={template} setRefreshToken={setRefreshToken} />
    </TableColumn>
  )
}
export default DetailColumn