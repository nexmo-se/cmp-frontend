// @flow
import React from "react";
import { v4 as uuid } from "uuid";
import Campaign from "entities/campaign";

import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";
import useCampaign from "hooks/campaign";

import ButtonIcon from "components/ButtonIcon";
import LoadingModal from "components/LoadingModal";

type Props = {
  campaign:Campaign, 
  setRefreshToken:Function
}

function DeleteButton({ campaign, setRefreshToken }:Props){
  const [ loading, setLoading ] = React.useState(false);
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mCampaign = useCampaign(token);

  async function handleClick(){
    try{
      setLoading(true);
      await mCampaign.remove(campaign);
      setRefreshToken(uuid());
    }catch(err){
      throwError(err);
    }finally{
      setLoading(false);
    }
  }

  return (
    <React.Fragment>
      <ButtonIcon 
        icon="Vlt-icon-bin"
        type="destructive"
        onClick={handleClick}
      />
      <LoadingModal label="Deletting campaign" visible={loading}/>
    </React.Fragment>
  )
}
export default DeleteButton