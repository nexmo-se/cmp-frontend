import React from "react";
import moment from "moment";

import DetailColumn from "./DetailColumn";
import NumberIndicator from "components/NumberIndicator";
import TableColumn from "components/Table/TableColumn";
import TableBodyRow from "components/Table/TableBodyRow";

function NormalTableBodyRow({ index, report }){
  const [ color, setColor ] = React.useState("Vlt-grey");

  React.useEffect(() => {
    if(report.status === "completed") setColor("Vlt-green");
  }, [ report.status ]);

  return (
    <TableBodyRow>
      <TableColumn>
        <NumberIndicator number={index} />
      </TableColumn>
      <TableColumn>
        <p>
          <b>{report.name}</b>
        </p>
        <p className="Vlt-grey Vlt-truncate">
          {new moment(report.submittedTime).format("DD MMMM YYYY")}
        </p>
      </TableColumn>
      <TableColumn>
        <p>
          <b className={color}>{report.status}</b>
        </p>
      </TableColumn>
      <DetailColumn report={report }/>
    </TableBodyRow>
  )
}
export default NormalTableBodyRow;
