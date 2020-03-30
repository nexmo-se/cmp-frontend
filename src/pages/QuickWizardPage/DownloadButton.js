import React from "react";

import Button from "components/Button";
import GenerateCSVModal from "components/GenerateCSVModal";

function DownloadButton({ refreshToken, campaign }){
  const [ visible, setVisible ] = React.useState(false);
  
  function handleClick(){
    setVisible(true)
  }

  return (
    <React.Fragment>
      <Button 
        type="tertiary" 
        style={{ width: "100%" }}
        onClick={handleClick}
      >
        Download Campaign Template
      </Button>
      <GenerateCSVModal 
        visible={visible}
        setVisible={setVisible}
        initCampaign={campaign}
        refreshToken={refreshToken}
      />
    </React.Fragment>
  )
}
export default DownloadButton;