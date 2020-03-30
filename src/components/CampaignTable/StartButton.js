import React from "react";
import uuid from "uuid/v4";

import useUser from "hooks/user";
import useError from "hooks/error";
import useCampaign from "hooks/campaign";

import ButtonIcon from "components/ButtonIcon";

function StartButton({ campaign, setRefreshToken, disabled }){
  const mUser = useUser();
  const mError = useError();
  const mCampaign = useCampaign(mUser.token);

  async function handleClick(){
    try{
      await mCampaign.updateStatus(campaign, "pending");
    }catch(err){
      mError.throwError(err);
    }finally{
      setRefreshToken(uuid());
    }
  }

  return (
    <ButtonIcon 
      icon="Vlt-icon-play" 
      onClick={handleClick}
      disabled={disabled}   
    />
  )
}
export default StartButton;