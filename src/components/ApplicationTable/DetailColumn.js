import React from "react";

import TableColumn from "components/Table/TableColumn";
import DeleteButton from "./DeleteButton";

function DetailColumn({ application, setRefreshToken }){
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <DeleteButton application={application} setRefreshToken={setRefreshToken} />
    </TableColumn>
  )
}
export default DetailColumn