// @flow
import React from "react";
import Campaign from "entities/campaign";
import { makeStyles } from "@material-ui/styles";

import ButtonIcon from "components/ButtonIcon";

type Props = { 
  campaign:Campaign,
  disabled:boolean,
  onClick:Function
}

function UploadButton({ onClick, campaign, ...props }:Props){
  function handleClick(){
    if(onClick) onClick(campaign);
  }

  return (
    <ButtonIcon 
      { ...props }
      icon="Vlt-icon-upload" 
      onClick={handleClick}
    />
  )
}
export default UploadButton;