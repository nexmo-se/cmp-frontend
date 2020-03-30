import React from "react";

import TableColumn from "components/Table/TableColumn";
import DeleteButton from "./DeleteButton";
import DetailButton from "./DetailButton";

function DetailColumn({ template, setRefreshToken }){
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <DetailButton template={template} />
      <DeleteButton template={template} setRefreshToken={setRefreshToken} />
    </TableColumn>
  )
}
export default DetailColumn