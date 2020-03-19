import React from "react";

import useAPIKey from "hooks/apiKey";
import useError from "hooks/error";
import useUser from "hooks/user";

import FullPageSpinner from "components/FullPageSpinner";
import Empty from "components/Empty";
import NormalTable from "./NormalTable";

function APIKeyTable({ refreshToken, setRefreshToken, compact=false }){
  const [ isFetching, setIsFetching ] = React.useState(true);
  const mUser = useUser();
  const mError = useError();
  const mAPIKey = useAPIKey(mUser.token);

  async function fetchData(){
    try{
      setIsFetching(true);
      await mAPIKey.list();
    }catch(err){
      mError.throwError(err);
    }finally{
      setIsFetching(false);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [ refreshToken ])

  if(isFetching) return <FullPageSpinner />
  else if(mAPIKey.data.length <= 0) return <Empty/>
  else if(compact) return null;
  else if(!compact) return <NormalTable apiKeys={mAPIKey.data} setRefreshToken={setRefreshToken} />
}
export default APIKeyTable;
