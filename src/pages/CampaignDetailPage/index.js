// @flow
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
import RefreshButton from "components/RefreshButton";
import ExportCampaignDetailReportButton from "components/ExportCampaignDetailReportButton";

import AllReportStatusCard from "./AllReportStatusCard";
import SummaryStats from "./SummaryStats";
import RejectedCard from "./RejectedCard";
import DeliveryCard from "./DeliveryCard";
import TimeTakenCard from "./TimeTakenCard";
import ReadCard from "./ReadCard";

function CampaignDetailPage(){
  const [refreshToken, setRefreshToken]= React.useState(uuid());
  const [isLoading, setIsLoading]= React.useState(true);
  const [campaign, setCampaign]= React.useState();
  const [report, setReport]= React.useState();
  const { campaignId } = useParams();
  const { token } = useUser();
  const { retrieve, summaryReport } = useCampaign(token);
  const { throwError } = useError();

  const fetchData = React.useCallback(
    async () => {
      try{
        setIsLoading(true);
        const foundCampaign = await retrieve(new Campaign({ id: campaignId }));
        const foundReport = await summaryReport(foundCampaign);
        setReport(foundReport);
        setCampaign(foundCampaign);
      }catch(err){
        throwError(err);
      }finally{
        setIsLoading(false);
      }
    },
    [campaignId, retrieve, summaryReport, throwError]
  )

  function handleRefresh(){
    setRefreshToken(uuid());
  }

  React.useEffect(
    () => {
      fetchData();
    },
    [fetchData, refreshToken ]
  )  

  if(isLoading) return <FullPageSpinner />;
  return (
    <React.Fragment>
      <PageHeader 
        title="CAMPAIGN"
        name={campaign?.name}
        rightComponent={(
          <React.Fragment>
            <RefreshButton onClick={handleRefresh} />
            <ExportCampaignDetailReportButton campaign={campaign} />
          </React.Fragment>
        )}
      />
      
      <SummaryStats report={report}>
        <RejectedCard />
        {(report?.read !== 0)? <ReadCard />: null}
        <DeliveryCard />
        <TimeTakenCard campaign={campaign} />
      </SummaryStats>

      <div className="Vlt-grid">
        <div className="Vlt-col">
          <CampaignDetailCard campaign={campaign} report={report} />
        </div>
        <div className="Vlt-col">
          <div className="Vlt-grid">
            <div className="Vlt-col Vlt-grid__separator">
              <CampaignAuditLogCard campaign={campaign} />
            </div>
            <div className="Vlt-col">
              <AllReportStatusCard report={report} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default CampaignDetailPage;