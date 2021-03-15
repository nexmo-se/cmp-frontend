// @flow
import React from "react";
import Campaign from "entities/campaign";

import ButtonIcon from "components/ButtonIcon";

interface DownloadButtonProps {
  campaign: Campaign,
  disabled: boolean,
  onClick: (campaign: Campaign) => void;
}

function DownloadButton ({ onClick, campaign, ...props }: DownloadButtonProps) {
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