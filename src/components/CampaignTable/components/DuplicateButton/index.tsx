import Campaign from "entities/campaign";

import { useModals } from "../Modals";
import { useSingleCampaign } from "hooks/single-campaign";

import ButtonIcon from "components/ButtonIcon";
import AddCampaignModal from "components/AddCampaignModal";
import LoadingModal from "components/LoadingModal";

interface DuplicateButtonProps {
  campaign: Campaign;
}

function DuplicateButton (props: DuplicateButtonProps) {
  const { showAddModal } = useModals();
  const { campaign } = useSingleCampaign({ id: props.campaign.id });

  async function handleClick () {
    if (!campaign) return;
    showAddModal({ campaign });
  }

  return (
    <ButtonIcon 
      icon="Vlt-icon-copy" 
      onClick={handleClick}
      style={{ marginRight: 4 }}
    />
  )
}
export default DuplicateButton;