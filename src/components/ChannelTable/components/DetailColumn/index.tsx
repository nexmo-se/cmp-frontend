import Table from "components/Table";
import DeleteButton from "../DeleteButton";

interface DetailColumnProps {
  channel: Channel;
}

function DetailColumn ({ channel }: DetailColumnProps) {
  return (
    <Table.Column className="Vlt-table__cell--nowrap">
      <DeleteButton channel={channel} />
    </Table.Column>
  )
}
export default DetailColumn