import React from "react";

import useApplication from "hooks/application";
import useUser from "hooks/user";
import useError from "hooks/error";

import Empty from "components/Empty";
import FullPageSpinner from "components/FullPageSpinner";

import NormalTable from "./NormalTable";
import CompactTable from "./CompactTable";

function ApplicationTable({ 
  refreshToken, 
  setRefreshToken, 
  applications,
  compact=false,
  preload=false
}){
  const [ data, setData ] = React.useState(applications || []);
  const [ isFetching, setIsFetching ] = React.useState(true);
  const mUser = useUser();
  const mError = useError();
  const mApplication = useApplication(mUser.token);

  async function fetchData(){
    try{
      setIsFetching(true);
      await mApplication.list();
    }catch(err){
      mError.throwError(err);
    }finally{
      setIsFetching(false);
    }
  }

  React.useEffect(() => {
    if(!preload) fetchData();
  }, [ refreshToken ]);

  React.useEffect(() => {
    if(!preload) setData(mApplication.data);
  }, [ mApplication.data ])
      
  if(!preload && isFetching) return <FullPageSpinner />
  else if(data?.length <= 0) return <Empty />
  else if(compact) return <CompactTable applications={data} />
  else if(!compact) {
    return (
      <NormalTable 
        applications={data} 
        setRefreshToken={setRefreshToken} 
      />
    )
  }else return null;
}
export default ApplicationTable;