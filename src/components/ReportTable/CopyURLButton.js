import React from "react";
import copy from "copy-to-clipboard";

import useError from "hooks/error";
import SuccessMessage from "entities/success";
import ButtonIcon from "components/ButtonIcon";

function CopyURLButton({ report, disabled }){
  const mError = useError();
  
  function handleClick(){
    copy(report.downloadURL)
    mError.throwSuccess(new SuccessMessage("Copied to clipboard"));
  }

  return (
    <ButtonIcon 
      icon="Vlt-icon-duplicate" 
      disabled={disabled}
      onClick={handleClick}
    />
  )
}
export default CopyURLButton;