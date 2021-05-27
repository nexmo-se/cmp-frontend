import Application from "entities/application";

import Table from "components/Table";
import DeleteButton from "../DeleteButton";

interface DetailColumnProps {
  application: Application;
}

function DetailColumn ({ application }: DetailColumnProps) {
  return (
    <Table.Column className="Vlt-table__cell--nowrap">
      <DeleteButton application={application} />
    </Table.Column>
  )
}
export default DetailColumn