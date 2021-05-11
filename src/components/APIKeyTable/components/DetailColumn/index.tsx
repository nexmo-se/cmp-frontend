import useStyles from "./styles";

import DetailButton from "../DetailButton";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import TableColumn from "components/Table/TableColumn";

interface DetailColumnProps {
  apiKey: ApiKey;
}

function DetailColumn ({ apiKey }: DetailColumnProps) {
  const mStyles = useStyles();

  return (
    <TableColumn>
      <EditButton
        className={mStyles.marginRight}
        apiKey={apiKey}
      />
      <DeleteButton apiKey={apiKey} />
    </TableColumn>
  )
}
export default DetailColumn