// @flow
import React from "react";
import { v4 as uuid } from "uuid";

import Campaign from "entities/campaign";

import useUser from "hooks/user";
import useCampaign from "hooks/campaign";
import useError from "hooks/error";
import { useParams } from "react-router-dom";

import FullPageSpinner from "components/FullPageSpinner";
import PageHeader from "components/PageHeader";
import RefreshButton from "components/RefreshButton";
import ExportCampaignDetailReportButton from "components/ExportCampaignDetailReportButton";

import CampaignAuditLogCard from "./components/CampaignAuditLogCard";
import CampaignDetailCard from "./components/CampaignDetailCard";
import AllReportStatusCard from "./components/AllReportStatusCard";
import SummaryStats from "./components/SummaryStats";
import RejectedCard from "./components/RejectedCard";
import DeliveryCard from "./components/DeliveryCard";
import TimeTakenCard from "./components/TimeTakenCard";
import ReadCard from "./components/ReadCard";
import UnansweredCard from "./components/UnansweredCard";
import CompletedCard from "./components/CompletedCard";

function CampaignDetailPage () {
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

  function handleRefresh () {
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
        <CompletedCard />
        <DeliveryCard />
        <ReadCard />
        <RejectedCard />
        <UnansweredCard />
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