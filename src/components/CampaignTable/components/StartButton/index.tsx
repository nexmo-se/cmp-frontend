import Campaign from "entities/campaign";

import useError from "hooks/error";
import useCampaign from "hooks/campaign";
import { useModals } from "../Modals";
import { useSingleCampaign } from "hooks/single-campaign";

import ButtonIcon from "components/ButtonIcon";

const VISIBLE_STATUS = ["draft", "paused", "completed", "reporting"];
const DISABLED_STATUS = ["completed", "reporting"];

interface StartButtonProps {
  campaign: Campaign; 
}

function StartButton ({ campaign }: StartButtonProps) {
  const { updateStatus } = useSingleCampaign({ id: campaign?.id ?? undefined });
  const { mutate } = useCampaign();
  const { showLoading, hideLoading } = useModals();
  const { throwError } = useError();

  async function handleClick(){
    try {
      showLoading({ label: "Starting campaign" });
      await updateStatus({ status: "pending" });
      await mutate();
    } catch (err: unknown) {
      throwError(err as Error);
    } finally {
      hideLoading()
    }
  }

  if (!VISIBLE_STATUS.includes(campaign.status)) return null;
  else {
    return (
      <ButtonIcon 
        icon="Vlt-icon-play" 
        onClick={handleClick}
        disabled={DISABLED_STATUS.includes(campaign.status)}  
      />
    )
  }
}

export default StartButton;
