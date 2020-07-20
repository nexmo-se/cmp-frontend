// @flow
import React from "react";
import { makeStyles } from "@material-ui/styles";
import Campaign from "entities/campaign";

import ButtonIcon from "components/ButtonIcon";

type Props = {
  campaign:Campaign,
  disabled:boolean,
  onClick:Function
}

function DownloadButton({ onClick, campaign, ...props }:Props){
  function handleClick(){
    if(onClick) onClick(campaign);
  }

  return (
    <ButtonIcon 
      { ...props }
      icon="Vlt-icon-download" 
      onClick={handleClick} 
    />
  )
}
export default DownloadButton;