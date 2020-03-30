import React from "react";

import ButtonIcon from "components/ButtonIcon";
import GenerateCSVModal from "components/GenerateCSVModal";

function DownloadButton({ campaign, disabled }){
  const [ visible, setVisible ] = React.useState(false);

  function handleClick(){
    setVisible(true);
  }

  return (
    <React.Fragment>
      <ButtonIcon 
        icon="Vlt-icon-download" 
        onClick={handleClick} 
        style={{ marginRight: 4 }}
        disabled={disabled}
      />
      <GenerateCSVModal 
        visible={visible} 
        setVisible={setVisible} 
        initCampaign={campaign.id}/>
    </React.Fragment>
  )
}
export default DownloadButton;