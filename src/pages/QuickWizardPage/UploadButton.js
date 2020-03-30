import React from "react";
import { useHistory } from "react-router-dom";

import useUser from "hooks/user";
import useCampaign from "hooks/campaign";

import Button from "components/Button";
import UploadRecordModal from "components/UploadRecordModal";

function UploadButton(){
  const [ visible, setVisible ] = React.useState(false);
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
        style={{ width: "100%" }}
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