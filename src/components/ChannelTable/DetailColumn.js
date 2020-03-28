import React from "react";

import TableColumn from "components/Table/TableColumn";
import DeleteButton from "./DeleteButton";

function DetailColumn({ channel, setRefreshToken }){
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <DeleteButton channel={channel} setRefreshToken={setRefreshToken} />
    </TableColumn>
  )
}
export default DetailColumn