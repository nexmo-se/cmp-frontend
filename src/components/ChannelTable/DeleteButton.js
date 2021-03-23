import React from "react";
import { v4 as uuid } from "uuid";

import useChannel from "hooks/channel";
import { ErrorContext } from "contexts/error";
import { UserContext } from "contexts/user";

import LoadingModal from "components/LoadingModal";
import ButtonIcon from "components/ButtonIcon";

function DeleteButton({ channel, setRefreshToken }){
  const [ isDeleting, setIsDeleting ] = React.useState(false);
  const { throwError } = React.useContext(ErrorContext);
  const { token } = React.useContext(UserContext);
  const mChannel = useChannel(token);

  async function handleClick(){
    try{
      setIsDeleting(true);
      await mChannel.remove(channel);
      setRefreshToken(uuid());
    }catch(err){
      throwError(err);
    }finally{
      setIsDeleting(false);
    }
  }

  return (
    <React.Fragment>
      <ButtonIcon 
        icon="Vlt-icon-bin"
        type="destructive"
        onClick={handleClick}
      />
      <LoadingModal label="Deleting Channel" visible={isDeleting} />
    </React.Fragment>
  )
}
export default DeleteButton