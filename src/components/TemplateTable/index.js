import React from "react";

import useTemplate from "hooks/template";
import useError from "hooks/error";
import useUser from "hooks/user";

import Empty from "components/Empty";
import FullPageSpinner from "components/FullPageSpinner";
import NormalTable from "./NormalTable";

function TemplateTable({ refreshToken, setRefreshToken }){
  const [ isFetching, setIsFetching ] = React.useState(true);
  const mUser = useUser();
  const mError = useError();
  const mTemplate = useTemplate(mUser.token);

  async function fetchData(){
    try{
      setIsFetching(true);
      await mTemplate.list()
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
  else if(mTemplate.data?.length <= 0) return <Empty />;
  else return <NormalTable templates={mTemplate.data} setRefreshToken={setRefreshToken} />
}
export default TemplateTable;