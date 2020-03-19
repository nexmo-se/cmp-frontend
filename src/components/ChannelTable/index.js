import React from "react";

import useChannel from "hooks/channel";

import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Empty from "components/Empty";
import NormalTable from "./NormalTable";
import CompactTable from "./CompactTable";

function ChannelTable({ refreshToken, setRefreshToken, compact=false }){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mChannel = useChannel(token);

  React.useEffect(() => {
    mChannel.list().catch((err) => throwError(err));
  }, [ refreshToken ])

  if(mChannel.data.length <= 0) return <Empty />;
  else if(compact) return <CompactTable channels={mChannel.data} />;
  else if(!compact) return <NormalTable channels={mChannel.data} setRefreshToken={setRefreshToken} />
}
export default ChannelTable;