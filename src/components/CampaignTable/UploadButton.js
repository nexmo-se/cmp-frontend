// @flow
import React from "react";
import Campaign from "entities/campaign";
import { makeStyles } from "@material-ui/styles";

import ButtonIcon from "components/ButtonIcon";
import UploadRecordModal from "components/UploadRecordModal";

const useStyles = makeStyles(() => ({
  button: { marginRight: 4 }
}))

type Props = { 
  campaign:Campaign,
  disabled:boolean 
}

function UploadButton({ campaign, ...props }:Props){
  const [ visible, setVisible ] = React.useState(false);
  const mStyles = useStyles();

  function handleClick(){
    setVisible((prevVisible) => !prevVisible);
  }

  return (
    <React.Fragment>
      <ButtonIcon 
        { ...props }
        icon="Vlt-icon-upload" 
        onClick={handleClick}
        className={mStyles.button}
      />
      <UploadRecordModal 
        campaign={campaign}
        visible={visible} 
        setVisible={setVisible} 
        disableCampaign
      />
    </React.Fragment>
  )
}
export default UploadButton;