import React from "react";

import useChannel from "hooks/channel";
import useError from "hooks/error";
import useUser from "hooks/user";

import Empty from "components/Empty";
import FullPageSpinner from "components/FullPageSpinner";

import NormalTable from "./NormalTable";
import CompactTable from "./CompactTable";

function ChannelTable({ 
  refreshToken, 
  setRefreshToken, 
  channels,
  compact=false,
  preload=false
}){
  const [ data, setData ] = React.useState(channels || []);
  const [ isFetching, setIsFetching ] = React.useState(true);
  const mUser = useUser();
  const mError = useError();
  const mChannel = useChannel(mUser.token);

  async function fetchData(){
    try{
      setIsFetching(true);
      await mChannel.list()
    }catch(err){
      mError.throwError(err);
    }finally{
      setIsFetching(false);
    }
  }

  React.useEffect(() => {
    if(!preload) setData(mChannel.data);
  }, [ mChannel.data ])

  React.useEffect(() => {
    if(!preload) fetchData();
  }, [ refreshToken ])

  if(!preload && isFetching) return <FullPageSpinner />
  else if(data?.length <= 0) return <Empty />;
  else if(compact) return <CompactTable channels={data} />;
  else if(!compact) return <NormalTable channels={data} setRefreshToken={setRefreshToken} />
}
export default ChannelTable;