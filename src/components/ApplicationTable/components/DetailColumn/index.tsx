import Application from "entities/application";

import TableColumn from "components/Table/TableColumn";
import DeleteButton from "../DeleteButton";

interface DetailColumnProps {
  application: Application;
}

function DetailColumn ({ application }: DetailColumnProps) {
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <DeleteButton application={application} />
    </TableColumn>
  )
}
export default DetailColumn