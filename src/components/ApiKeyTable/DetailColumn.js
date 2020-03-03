import React from "react";

import TableColumn from "components/Table/TableColumn";
import DetailButton from "components/APIKeyTable/DetailButton";
import DeleteButton from "components/APIKeyTable/DeleteButton";

function DetailColumn({ apiKey, setRefreshToken }){
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <DetailButton />
      <DeleteButton apiKey={apiKey} setRefreshToken={setRefreshToken} />
    </TableColumn>
  )
}
export default DetailColumn