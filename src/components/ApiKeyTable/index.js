import React from "react";

import useAPIKey from "hooks/apiKey";
import useError from "hooks/error";
import useUser from "hooks/user";

import FullPageSpinner from "components/FullPageSpinner";
import Empty from "components/Empty";
import NormalTable from "./NormalTable";

function APIKeyTable({ refreshToken, setRefreshToken, compact=false }){
  const [ isFetching, setIsFetching ] = React.useState(true);
  const { token } = useUser();
  const { throwError } = useError();
  const { list, data } = useAPIKey(token);

  React.useEffect(
    () => {
      async function fetchData(){
        try{
          setIsFetching(true);
          await list();
        }catch(err){
          throwError(err);
        }finally{
          setIsFetching(false);
        }
      }
      fetchData();
    },
    [refreshToken, list, throwError]
  )

  if (isFetching) {
    return <FullPageSpinner />
  } else if (data.length <= 0) {
    return <Empty/>
  } else if (compact) {
    return null;
  } else if (!compact) {
    return (
      <NormalTable
        apiKeys={data}
        setRefreshToken={setRefreshToken}
      />
    )
  }
}
export default APIKeyTable;
