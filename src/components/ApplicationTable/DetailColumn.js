import React from "react";

import TableColumn from "components/Table/TableColumn";
import DetailButton from "components/ApplicationTable/DetailButton";
import DeleteButton from "components/ApplicationTable/DeleteButton";

function DetailColumn({ application, setRefreshToken }){
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <DetailButton />
      <DeleteButton application={application} setRefreshToken={setRefreshToken} />
    </TableColumn>
  )
}
export default DetailColumn