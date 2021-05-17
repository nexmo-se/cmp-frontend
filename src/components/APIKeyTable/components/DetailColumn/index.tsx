import useStyles from "./styles";

import DetailButton from "../DetailButton";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import Table from "components/Table";

interface DetailColumnProps {
  apiKey: ApiKey;
}

function DetailColumn ({ apiKey }: DetailColumnProps) {
  const mStyles = useStyles();

  return (
    <Table.Column>
      <EditButton
        className={mStyles.marginRight}
        apiKey={apiKey}
      />
      <DeleteButton apiKey={apiKey} />
    </Table.Column>
  )
}
export default DetailColumn