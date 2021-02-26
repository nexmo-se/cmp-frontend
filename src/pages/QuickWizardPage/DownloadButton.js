// @flow
import React from "react";
import Campaign from "entities/campaign";
import { makeStyles } from "@material-ui/styles";

import Button from "components/Button";
import GenerateCSVModal from "components/GenerateCSVModal";

type Props = {
  refreshToken:string,
  campaign?:Campaign,
  disabled?:boolean
}

const useStyles = makeStyles(() => ({
  fullWidth: { width: "100%" }
}))

function DownloadButton({ refreshToken, campaign, disabled }:Props){
  const [ visible, setVisible ] = React.useState(false);
  const mStyles = useStyles();
  
  function handleClick(){
    setVisible(true)
  }

  return (
    <React.Fragment>
      <Button 
        type="tertiary" 
        className={mStyles.fullWidth}
        onClick={handleClick}
        disabled={disabled}
      >
        Download Campaign Template
      </Button>
      {campaign?(
        <GenerateCSVModal 
          visible={visible}
          setVisible={setVisible}
          campaign={campaign}
          refreshToken={refreshToken}
          disableCampaign={true}
        />
      ):null}
    </React.Fragment>
  )
}
export default DownloadButton;