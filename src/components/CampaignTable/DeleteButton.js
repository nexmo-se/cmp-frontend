import React from "react";
import uuid from "uuid/v4";

import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";
import useCampaign from "hooks/campaign";

import ButtonIcon from "components/ButtonIcon";
import LoadingModal from "components/LoadingModal";

function DeleteButton({ campaign, setRefreshToken }){
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