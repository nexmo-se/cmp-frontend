import TableColumn from "components/Table/TableColumn";
import DeleteButton from "../DeleteButton";

interface DetailColumnProps {
  channel: Channel;
}

function DetailColumn ({ channel }: DetailColumnProps) {
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <DeleteButton channel={channel} />
    </TableColumn>
  )
}
export default DetailColumn