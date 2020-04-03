import React from "react";

import TableColumn from "components/Table/TableColumn";
import DownloadButton from "./DownloadButton";
import CopyURLButton from "./CopyURLButton";

function DetailColumn({ report }){
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <CopyURLButton report={report} />
      <DownloadButton report={report} />
    </TableColumn>
  )
}
export default DetailColumn