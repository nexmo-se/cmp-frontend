import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

import useUser from "hooks/user";
import useCampaign from "hooks/campaign";

import Button from "components/Button";
import UploadRecordModal from "components/UploadRecordModal";

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: "100%"
  }
}))

function UploadButton(){
  const [ visible, setVisible ] = React.useState(false);
  const mStyles = useStyles();
  const mHistory = useHistory();
  const mUser = useUser();
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
      >
        Upload & Start Campaign
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