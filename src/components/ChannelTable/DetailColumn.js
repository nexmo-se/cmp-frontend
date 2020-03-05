import React from "react";

import TableColumn from "components/Table/TableColumn";
import DetailButton from "components/ChannelTable/DetailButton";
import DeleteButton from "components/ChannelTable/DeleteButton";

function DetailColumn({ channel, setRefreshToken }){
  return (
    <TableColumn className="Vlt-table__cell--nowrap">
      <DetailButton />
      <DeleteButton channel={channel} setRefreshToken={setRefreshToken} />
    </TableColumn>
  )
}
export default DetailColumn