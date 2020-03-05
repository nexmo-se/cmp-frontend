import React from "react";

import TableColumn from "components/Table/TableColumn";
import DetailButton from "components/TemplateTable/DetailButton";
import DeleteButton from "components/TemplateTable/DeleteButton";

function DetailColumn({ template, setRefreshToken }){
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <DetailButton />
      <DeleteButton template={template} setRefreshToken={setRefreshToken} />
    </TableColumn>
  )
}
export default DetailColumn