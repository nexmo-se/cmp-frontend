import React from "react";
import uuid from "uuid/v4";

import ButtonIcon from "components/ButtonIcon";
import UploadRecordModal from "components/UploadRecordModal";

function RestartButton({ setRefreshToken }){
  const [ visible, setVisible ] = React.useState(false);

  function handleClick(){
    setVisible((prevVisible) => !prevVisible);
  }

  function handleUploaded(){
    setRefreshToken(uuid());
  }

  return (
    <React.Fragment>
      <ButtonIcon 
        icon="Vlt-icon-reload" 
        onClick={handleClick}
        style={{ marginRight: 4 }}
      />
      <UploadRecordModal 
        visible={visible} 
        setVisible={setVisible} 
        onUploaded={handleUploaded}
      />
    </React.Fragment>
  )
}
export default RestartButton;