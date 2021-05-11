import Template from "entities/template";

import TableColumn from "components/Table/TableColumn";
import DeleteButton from "../DeleteButton";
import DetailButton from "../DetailButton";

interface DetailColumnProps {
  template: Template;
}

function DetailColumn ({ template }: DetailColumnProps) {
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <DetailButton template={template} />
      <DeleteButton template={template} />
    </TableColumn>
  )
}
export default DetailColumn