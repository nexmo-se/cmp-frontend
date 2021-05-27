import Campaign from "entities/campaign";
import ButtonIcon from "components/ButtonIcon";
import { useModals } from "../Modals";

interface DownloadButtonProps {
  campaign: Campaign;
}

function DownloadButton ({ campaign }: DownloadButtonProps) {
  const { showGenerateModal } = useModals();

  function handleClick () {
    if (!campaign) return;
    showGenerateModal({ campaign });
  }

  return (
    <ButtonIcon 
      icon="Vlt-icon-download" 
      onClick={handleClick}
      disabled={campaign.status !== "draft"}
    />
  )
}
export default DownloadButton;