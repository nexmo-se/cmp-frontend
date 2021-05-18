import { useSingleCampaign } from "hooks/single-campaign";
import { useParams } from "react-router-dom";

import Header from "./components/Header";
import CampaignAuditLogCard from "./components/CampaignAuditLogCard";
import CampaignDetailCard from "./components/CampaignDetailCard";
import AllReportStatusCard from "./components/AllReportStatusCard";
import SummaryReportProvider from "./components/SummaryReport";
import RejectedCard from "./components/RejectedCard";
import DeliveryCard from "./components/DeliveryCard";
import TimeTakenCard from "./components/TimeTakenCard";
import ReadCard from "./components/ReadCard";
import UnansweredCard from "./components/UnansweredCard";
import CompletedCard from "./components/CompletedCard";

function CampaignDetailPage () {
  const { campaignId } = useParams();

  return (
    <SummaryReportProvider campaignId={campaignId}>
      <Header />
      
      <div className="Vlt-grid">
        <CompletedCard />
        <DeliveryCard />
        <ReadCard />
        <RejectedCard />
        <UnansweredCard />
        <TimeTakenCard />
      </div>

      <div className="Vlt-grid">
        <div className="Vlt-col">
          <CampaignDetailCard />
        </div>
        <div className="Vlt-col">
          <div className="Vlt-grid">
            <div className="Vlt-col Vlt-grid__separator">
              <CampaignAuditLogCard />
            </div>
            <div className="Vlt-col">
              <AllReportStatusCard />
            </div>
          </div>
        </div>
      </div>
    </SummaryReportProvider>
  )
}
export default CampaignDetailPage;