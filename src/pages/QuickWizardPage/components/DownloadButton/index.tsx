import Campaign from "entities/campaign";

import useStyles from "./styles";
import { useState } from "react";

import Button from "components/Button";
import GenerateCSVModal from "components/GenerateCSVModal";

interface DownloadButtonProps {
  campaign?: Campaign;
  disabled?: boolean;
}

function DownloadButton ({ campaign, disabled }: DownloadButtonProps) {
  const [visible, setVisible] = useState(false);
  const mStyles = useStyles();
  
  function handleClick () {
    setVisible(true)
  }

  return (
    <>
      <Button 
        type="tertiary" 
        className={mStyles.fullWidth}
        onClick={handleClick}
        disabled={disabled}
      >
        Download Campaign Template
      </Button>
      {
        campaign && (
          <GenerateCSVModal 
            visible={visible}
            setVisible={setVisible}
            campaign={campaign}
          />
        )
      }
    </>
  )
}
export default DownloadButton;