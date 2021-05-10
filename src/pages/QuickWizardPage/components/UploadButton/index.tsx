// @flow
import React from "react";
import Campaign from "entities/campaign";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

import useUser from "hooks/user";
import useCampaign from "hooks/campaign";

import Button from "components/Button";
import UploadRecordModal from "components/UploadRecordModal";

interface UploadButtonProps {
  campaign?: Campaign,
  refreshToken: string,
  disabled?: boolean 
};

const useStyles = makeStyles(() => ({
  fullWidth: { width: "100%" }
}))

function UploadButton ({ campaign, refreshToken, disabled }: UploadButtonProps) {
  const [visible, setVisible] = React.useState(false);
  const mHistory = useHistory();
  const mUser = useUser();
  const mStyles = useStyles();
  const mCampaign = useCampaign(mUser.token);

  function handleClick(){
    setVisible(true);
  }

  async function handleUploaded (campaign): Promise<void> {
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
      {campaign?(
        <UploadRecordModal 
          visible={visible}
          setVisible={setVisible}
          onUploaded={handleUploaded}
          campaign={campaign}
          refreshToken={refreshToken}
          disableCampaign
        />
      ): null}
    </React.Fragment>
  )
}
export default UploadButton;