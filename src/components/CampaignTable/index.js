import React from "react";

import useCampaign from "hooks/campaign";
import useError from "hooks/error";
import useUser from "hooks/user";

import Empty from "components/Empty";
import FullPageSpinner from "components/FullPageSpinner";
import NormalTable from "./NormalTable";

function CampaignTable({ refreshToken, setRefreshToken }){
  const [ isFetching, setIsFetching ] = React.useState(true);
  const mUser = useUser();
  const mError = useError();
  const mCampaign = useCampaign(mUser.token);

  async function fetchData(){
    try{
      setIsFetching(true);
      await mCampaign.list()
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
  else if(mCampaign.data?.length <= 0) return <Empty />;
  else return <NormalTable campaigns={mCampaign.data} setRefreshToken={setRefreshToken} />
}
export default CampaignTable;