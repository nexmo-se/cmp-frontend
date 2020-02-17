import React from "react";
import uuid from "uuid/v4";

import useCampaign from "hooks/campaign";
import { ErrorContext } from "contexts/error";
import { UserContext } from "contexts/user";

import ButtonIcon from "components/ButtonIcon";

function PauseButton({ campaign, setRefreshToken }){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mCampaign = useCampaign(token);

  async function handleClick(){
    try{
      await mCampaign.updateStatus(campaign, "paused");
    }catch(err){
      throwError(err);
    }finally{
      setRefreshToken(uuid());
    }
  }

  return (
    <ButtonIcon 
      icon="Vlt-icon-pause"
      onClick={handleClick} 
    />
  )
}
export default PauseButton;