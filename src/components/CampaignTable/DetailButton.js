import React from "react";
import { useHistory } from "react-router-dom";

import ButtonIcon from "components/ButtonIcon";

function DetailButton({ campaign }){
  const history = useHistory();

  function handleClick(){
    history.push(`/campaigns/${campaign.id}`);
  }

  return (
    <ButtonIcon 
      icon="Vlt-icon-gear"
      onClick={handleClick}
    />
  )
}
export default DetailButton;