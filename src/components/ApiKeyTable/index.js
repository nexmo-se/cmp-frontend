import React from "react";

import useAPIKey from "hooks/apiKey";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Empty from "components/Empty";
import NormalTable from "./NormalTable";

function APIKeyTable({ refreshToken, setRefreshToken, compact=false }){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mAPIKey = useAPIKey(token);

  React.useEffect(() => {
    mAPIKey.list().catch((err) => throwError(err));
  }, [ refreshToken ])

  if(mAPIKey.data.length <= 0) return <Empty/>
  else if(compact) return null;
  else if(!compact) return <NormalTable apiKeys={mAPIKey.data} setRefreshToken={setRefreshToken} />
}
export default APIKeyTable;
