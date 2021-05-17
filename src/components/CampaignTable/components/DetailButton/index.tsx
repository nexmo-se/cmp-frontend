import Campaign from "entities/campaign";

import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import ButtonIcon from "components/ButtonIcon";

interface DetailButtonProps {
  campaign: Campaign;
}

function DetailButton ({ campaign }: DetailButtonProps) {
  const [disabled, setDisabled] = useState<boolean>(true);
  const { push } = useHistory();

  useEffect(
    () => {
      const enabledStatus = ["reporting", "completed"];
      setDisabled(!enabledStatus.includes(campaign.status))
    },
    [campaign]
  )

  function handleClick () {
    push(`/campaigns/${campaign.id}`);
  }

  return (
    <ButtonIcon 
      icon="Vlt-icon-gear"
      disabled={disabled}
      onClick={handleClick}
    />
  )
}
export default DetailButton;