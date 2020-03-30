import React from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

import APIKey from "entities/apiKey";
import useUser from "hooks/user";
import useError from "hooks/error";
import useAPIKey from "hooks/apiKey";

import APIKeyInformationCard from "components/APIKeyInformationCard";
import FullPageSpinner from "components/FullPageSpinner";
import PageHeader from "components/PageHeader";

import EditButton from "./EditButton";
import SummaryCard from "./SummaryCard";
import ApplicationListCard from "./ApplicationListCard";
import ChannelListCard from "./ChannelListCard";

function APIKeyDetailPage(){
  const [ apiKey, setAPIKey ] = React.useState();
  const [ isFetching, setIsFetching ] = React.useState(true);
  const [ refreshToken, setRefreshToken ] = React.useState(uuid());
  const { apiKeyId } = useParams();
  const mUser = useUser();
  const mError = useError();
  const mAPIKey = useAPIKey(mUser.token);

  async function fetchData(){
    try{
      setIsFetching(true);
      const apiKey = await mAPIKey.retrieve(APIKey.fromID(apiKeyId));
      setAPIKey(apiKey);
    }catch(err){
      mError.throwError(err);
    }finally{
      setIsFetching(false);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [ apiKeyId, refreshToken ])

  if(isFetching) return <FullPageSpinner />
  return (
    <React.Fragment>
      <PageHeader 
        title="API KEY"
        name={apiKey?.name}
        rightComponent={(
          <EditButton apiKey={apiKey} setRefreshToken={setRefreshToken} />
        )}
      />
      <div className="Vlt-grid">
        <div className="Vlt-col Vlt-col--2of3">
          <SummaryCard apiKey={apiKey} />
          <div className="Vlt-grid">
            <ApplicationListCard applications={apiKey.applications} />
            <ChannelListCard channels={apiKey.channels} />
          </div>
        </div>
        <div className="Vlt-col">
          <APIKeyInformationCard />
        </div>
      </div>
    </React.Fragment>
  );
}
export default APIKeyDetailPage;
