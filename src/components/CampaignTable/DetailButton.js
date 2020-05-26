import React from "react";
import { useHistory } from "react-router-dom";

import ButtonIcon from "components/ButtonIcon";

function DetailButton({ campaign, disabled }){
  const history = useHistory();

  function handleClick(){
    history.push(`/campaigns/${campaign.id}`);
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