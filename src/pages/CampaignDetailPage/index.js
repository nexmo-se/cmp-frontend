import React from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

import Campaign from "entities/campaign";

import useUser from "hooks/user";
import useCampaign from "hooks/campaign";
import useError from "hooks/error";

import CampaignDetailCard from "components/CampaignDetailCard";
import CampaignAuditLogCard from "components/CampaignAuditLogCard";
import FullPageSpinner from "components/FullPageSpinner";
import PageHeader from "components/PageHeader";
import Button from "components/Button";
import ExportCampaignDetailReportButton from "components/ExportCampaignDetailReportButton";

import SummaryStats from "./SummaryStats";
import RejectedCard from "./RejectedCard";
import DeliveryCard from "./DeliveryCard";
import TimeTakenCard from "./TimeTakenCard";
import ReadCard from "./ReadCard";


function CampaignDetailPage(){
  const [ refreshToken, setRefreshToken ] = React.useState(uuid());
  const [ isLoading, setIsLoading ] = React.useState(true);
  const [ campaign, setCampaign ] = React.useState();
  const [ report, setReport ] = React.useState();
  const { campaignId } = useParams();
  const mUser = useUser();
  const mError = useError();
  const mCampaign = useCampaign(mUser.token);

  async function fetchData(){
    try{
      setIsLoading(true);
      const foundCampaign = await mCampaign.retrieve(Campaign.fromID(campaignId));
      const foundReport = await mCampaign.summaryReport(foundCampaign);
      setReport(foundReport);
      setCampaign(foundCampaign);
    }catch(err){
      mError.throwError(err);
    }finally{
      setIsLoading(false);
    }
  }

  function handleRefresh(){
    setRefreshToken(uuid());
  }

  React.useEffect(() => {
    fetchData();
  }, [ campaignId, refreshToken ])

  if(isLoading) return <FullPageSpinner />;
  return (
    <React.Fragment>
      <PageHeader 
        title="CAMPAIGN"
        name={campaign?.name}
        rightComponent={(
          <React.Fragment>
            <Button type="tertiary" onClick={handleRefresh}>Refresh</Button>
            <ExportCampaignDetailReportButton campaign={campaign} />
          </React.Fragment>
        )}
      />
      
      <SummaryStats report={report}>
        <RejectedCard />
        {(report.read !== 0)? <ReadCard />: null}
        <DeliveryCard />
        <TimeTakenCard campaign={campaign} />
      </SummaryStats>

      <div className="Vlt-grid">
        <div className="Vlt-col">
          <CampaignDetailCard campaign={campaign} report={report} />
        </div>
        <div className="Vlt-col">
          <CampaignAuditLogCard campaign={campaign} />
        </div>
      </div>
    </React.Fragment>
  )
}
export default CampaignDetailPage;