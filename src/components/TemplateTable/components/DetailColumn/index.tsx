import Template from "entities/template";

import Table from "components/Table";
import DeleteButton from "../DeleteButton";
import DetailButton from "../DetailButton";

interface DetailColumnProps {
  template: Template;
}

function DetailColumn ({ template }: DetailColumnProps) {
  return (
    <Table.Column className="Vlt-table__cell--nowrap">
      <DetailButton template={template} />
      <DeleteButton template={template} />
    </Table.Column>
  )
}
export default DetailColumn