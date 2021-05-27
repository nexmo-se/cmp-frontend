import { useReportData } from "../SummaryReport";

import PageHeader from "components/PageHeader";
import ExportCampaignDetailReportButton from "../ExportCampaignDetailReportButton";

function Header () {
  const { campaign } = useReportData();

  if (!campaign) return null;
  else {
    return (
      <PageHeader 
        title="CAMPAIGN"
        name={campaign.name}
        rightComponent={(
          <ExportCampaignDetailReportButton />
        )}
      />
    )
  }
}

export default Header;
