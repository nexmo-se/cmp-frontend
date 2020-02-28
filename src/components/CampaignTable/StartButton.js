import React from "react";
import uuid from "uuid/v4";

import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";
import useCampaign from "hooks/campaign";

import ButtonIcon from "components/ButtonIcon";

function StartButton({ campaign, setRefreshToken }){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mCampaign = useCampaign(token);

  async function handleClick(){
    try{
      await mCampaign.updateStatus(campaign, "pending");
    }catch(err){
      throwError(err);
    }finally{
      setRefreshToken(uuid());
    }
  }

  return (
    <ButtonIcon 
      icon="Vlt-icon-play" 
      onClick={handleClick}      
    />
  )
}
export default StartButton;