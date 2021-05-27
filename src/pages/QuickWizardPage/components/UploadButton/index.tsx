import Campaign from "entities/campaign";

import useStyles from "./styles";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "components/Button";
import UploadRecordModal from "components/UploadRecordModal";
import { useSingleCampaign } from "hooks/single-campaign";

interface UploadButtonProps {
  campaign?: Campaign,
  disabled?: boolean 
};

function UploadButton ({ campaign, disabled }: UploadButtonProps) {
  const [visible, setVisible] = useState(false);
  const { push } = useHistory();
  const { updateStatus} = useSingleCampaign({ id: campaign?.id ?? undefined });
  const mStyles = useStyles();

  function handleClick () {
    setVisible(true);
  }

  async function handleUploaded (campaign: Campaign): Promise<void> {
    await updateStatus({ status: "pending" });
    push("/campaigns");
  }

  return (
    <>
      <Button 
        type="secondary"
        className={mStyles.fullWidth}
        onClick={handleClick}
        disabled={disabled}
      >
        Upload &amp; Start Campaign
      </Button>
      {
        campaign && (
          <UploadRecordModal 
            visible={visible}
            setVisible={setVisible}
            onUploaded={handleUploaded}
            campaign={campaign}        
          />
        )
      }
    </>
  )
}
export default UploadButton;