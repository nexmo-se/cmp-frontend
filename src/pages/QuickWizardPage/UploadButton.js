// @flow
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

import useUser from "hooks/user";
import useCampaign from "hooks/campaign";

import Button from "components/Button";
import UploadRecordModal from "components/UploadRecordModal";

type Props = { disabled?:boolean };

const useStyles = makeStyles(() => ({
  fullWidth: { width: "100%" }
}))

function UploadButton({ disabled }:Props){
  const [ visible, setVisible ] = React.useState(false);
  const mHistory = useHistory();
  const mUser = useUser();
  const mStyles = useStyles();
  const mCampaign = useCampaign(mUser.token);

  function handleClick(){
    setVisible(true);
  }

  async function handleUploaded(campaign){
    await mCampaign.updateStatus(campaign, "pending");
    mHistory.push("/campaigns");
  }

  return (
    <React.Fragment>
      <Button 
        type="secondary"
        className={mStyles.fullWidth}
        onClick={handleClick}
        disabled={disabled}
      >
        Upload &amp; Start Campaign
      </Button>
      <UploadRecordModal 
        visible={visible}
        setVisible={setVisible}
        onUploaded={handleUploaded}
      />
    </React.Fragment>
  )
}
export default UploadButton;