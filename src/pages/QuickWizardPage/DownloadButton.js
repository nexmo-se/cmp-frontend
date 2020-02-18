import React from "react";

import Button from "components/Button";
import GenerateCSVModal from "components/GenerateCSVModal";

function DownloadButton({ campaign }){
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
      />
    </React.Fragment>
  )
}
export default DownloadButton;