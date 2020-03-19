import React from "react";

import useApplication from "hooks/application";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Empty from "components/Empty";
import NormalTable from "./NormalTable";
import CompactTable from "./CompactTable";

function ApplicationTable({ refreshToken, setRefreshToken, compact=false }){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mApplication = useApplication(token);

  React.useEffect(() => {
    mApplication.list().catch((err) => throwError(err));
  }, [ refreshToken ])
      
  if(mApplication.data.length <= 0) return <Empty />
  else if(compact) return <CompactTable applications={mApplication.data} />
  else if(!compact) {
    return (
      <NormalTable 
        applications={mApplication.data} 
        setRefreshToken={setRefreshToken} 
      />
    )
  }else return null;
}
export default ApplicationTable;