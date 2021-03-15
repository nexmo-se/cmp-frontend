// @flow
import React from "react";
import Application from "entities/application";

import useApplication from "hooks/application";
import useUser from "hooks/user";
import useError from "hooks/error";

import Empty from "components/Empty";
import FullPageSpinner from "components/FullPageSpinner";

import NormalTable from "./NormalTable";
import CompactTable from "./CompactTable";

interface ApplicationTableProps {
  refreshToken: string;
  setRefreshToken: (token: string) => void;
  applications: Application[];
  compact: boolean;
  preload: boolean;
}

function ApplicationTable (props: ApplicationTableProps) {
  const { 
    refreshToken, 
    setRefreshToken, 
    applications,
    compact = false,
    preload = false
  } = props;

  const [ data, setData ] = React.useState(applications || []);
  const [ isFetching, setIsFetching ] = React.useState(true);
  const { token } = useUser();
  const { throwError } = useError();
  const {
    list,
    data: fetchedData
  } = useApplication(token);

  const fetchData = React.useCallback(
    async () => {
      try{
        setIsFetching(true);
        await list();
      }catch(err){
        throwError(err);
      }finally{
        setIsFetching(false);
      }
    },
    [list, throwError]
  )

  React.useEffect(
    () => {
      if(!preload) fetchData();
    },
    [refreshToken, fetchData, preload]
  );

  React.useEffect(
    () => {
      if(!preload) setData(fetchedData);
    },
    [fetchedData, preload]
  )
      
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