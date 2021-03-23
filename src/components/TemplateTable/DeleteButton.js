import React from "react";
import { v4 as uuid } from "uuid";

import useTemplate from "hooks/template";
import { ErrorContext } from "contexts/error";
import { UserContext } from "contexts/user";

import LoadingModal from "components/LoadingModal";
import ButtonIcon from "components/ButtonIcon";

function DeleteButton({ template, setRefreshToken }){
  const [ isDeleting, setIsDeleting ] = React.useState(false);
  const { throwError } = React.useContext(ErrorContext);
  const { token } = React.useContext(UserContext);
  const mTemplate = useTemplate(token);

  async function handleClick(){
    try{
      setIsDeleting(true);
      await mTemplate.remove(template);
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
      <LoadingModal label="Deleting Template" visible={isDeleting} />
    </React.Fragment>
  )
}
export default DeleteButton