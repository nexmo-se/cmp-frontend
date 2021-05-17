import Campaign from "entities/campaign";

import useError from "hooks/error";
import { useSingleCampaign } from "hooks/single-campaign";

import ButtonIcon from "components/ButtonIcon";

interface PauseButtonProps {
  campaign: Campaign;
}

const VISIBLE_STATUS = ["started", "pending"];

function PauseButton ({ campaign }: PauseButtonProps) {
  const { updateStatus } = useSingleCampaign({ id: campaign.id });

  async function handleClick () {
    try {
      await updateStatus({ status: "paused" });
    } catch (err) {
      throwError(err);
    }
  }

  if (!VISIBLE_STATUS.includes(campaign.status)) return null;
  else {
    return (
    <ButtonIcon 
        icon="Vlt-icon-pause"
        onClick={handleClick} 
      />
    )
  }
}
export default PauseButton;