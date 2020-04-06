import React from "react";

import useUser from "hooks/user";
import useError from "hooks/error";
import useReport from "hooks/report";

import NormalTable from "./NormalTable";
import Empty from "components/Empty";
import FullPageSpinner from "components/FullPageSpinner";

function ReportTable({ refreshToken }){
  const [ isFetching, setIsFetching ] = React.useState(false);
  const mUser = useUser();
  const mError = useError();
  const mReport = useReport(mUser.token);

  async function fetchData(){
    try{
      setIsFetching(true);
      await mReport.list();
    }catch(err){
      mError.throwError(err)
    }finally{
      setIsFetching(false);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [ refreshToken ])

  if(isFetching) return <FullPageSpinner />
  else if(mReport.reports?.length === 0) return <Empty />
  else return <NormalTable reports={mReport.reports} />
}
export default ReportTable;