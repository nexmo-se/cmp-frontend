import useCampaign from "hooks/campaign";

import Empty from "components/Empty";
import FullPageSpinner from "components/FullPageSpinner";
import NormalTable from "./components/NormalTable";

function CampaignTable () {
  const { campaigns, isLoading } = useCampaign();

  if (isLoading) return <FullPageSpinner />
  else if (campaigns.length <= 0) return <Empty />;
  else return <NormalTable campaigns={campaigns} />
}

export default CampaignTable;