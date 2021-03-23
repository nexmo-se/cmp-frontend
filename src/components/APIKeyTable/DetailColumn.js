import React from "react";
import { makeStyles } from "@material-ui/styles";

import TableColumn from "components/Table/TableColumn";

import DetailButton from "./DetailButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const useStyles = makeStyles(() => ({
  marginRight: { marginRight: 4 }
}))

function DetailColumn({ apiKey, setRefreshToken }){
  const mStyles = useStyles();

  return (
    <TableColumn>
      <DetailButton apiKey={apiKey} />
      <EditButton className={mStyles.marginRight} apiKey={apiKey} setRefreshToken={setRefreshToken} />
      <DeleteButton apiKey={apiKey} setRefreshToken={setRefreshToken} />
    </TableColumn>
  )
}
export default DetailColumn