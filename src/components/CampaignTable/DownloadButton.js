// @flow
import React from "react";
import { makeStyles } from "@material-ui/styles";
import Campaign from "entities/campaign";

import ButtonIcon from "components/ButtonIcon";
import GenerateCSVModal from "components/GenerateCSVModal";

const useStyles = makeStyles(() => ({
  button: { marginRight: 4 }
}))

type Props = {
  campaign:Campaign
}

function DownloadButton({ campaign, ...props }:Props){
  const [ visible, setVisible ] = React.useState(false);
  const mStyles = useStyles();

  function handleClick(){
    setVisible(true);
  }

  return (
    <React.Fragment>
      <ButtonIcon 
        { ...props }
        icon="Vlt-icon-download" 
        onClick={handleClick} 
        className={mStyles.button}
      />
      <GenerateCSVModal 
        visible={visible} 
        setVisible={setVisible} 
        campaign={campaign}
        disableCampaign
      />
    </React.Fragment>
  )
}
export default DownloadButton;