import React from "react";
import { v4 as uuid } from "uuid";

import useApplication from "hooks/application";
import { ErrorContext } from "contexts/error";
import { UserContext } from "contexts/user";

import LoadingModal from "components/LoadingModal";
import ButtonIcon from "components/ButtonIcon";

function DeleteButton({ application, setRefreshToken }){
  const [ isDeleting, setIsDeleting ] = React.useState(false);
  const { throwError } = React.useContext(ErrorContext);
  const { token } = React.useContext(UserContext);
  const mApplication = useApplication(token);

  async function handleClick(){
    try{
      setIsDeleting(true);
      await mApplication.remove(application);
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
      <LoadingModal label="Deleting Application" visible={isDeleting} />
    </React.Fragment>
  )
}
export default DeleteButton