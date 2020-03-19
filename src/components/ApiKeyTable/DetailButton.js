import React from "react";
import { useHistory } from "react-router-dom";

import ButtonIcon from "components/ButtonIcon";

function DetailButton({ apiKey }){
  const mHistory = useHistory();
  
  function handleClick(){
    mHistory.push(`/apikeys/${apiKey.id}`);
  }
  return (
    <ButtonIcon 
      icon="Vlt-icon-gear"
      onClick={handleClick}
    />
  )
}
export default DetailButton;