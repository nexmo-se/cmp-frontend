import Campaign from "entities/campaign";
import { useModals } from "../Modals";

import ButtonIcon from "components/ButtonIcon";

interface UploadButtonProps {
  campaign: Campaign;
}

function UploadButton ({ campaign }: UploadButtonProps) {
  const { showUploadModal } = useModals();
  
  function handleClick () {
    showUploadModal({ campaign });  
  }

  return (
    <ButtonIcon 
      icon="Vlt-icon-upload" 
      onClick={handleClick}
      disabled={campaign.status !== "draft"} 
    />
  )
}
export default UploadButton;