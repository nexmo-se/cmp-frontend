import React from "react";
import uuid from "uuid";

import ButtonIcon from "components/ButtonIcon";
import UploadRecordModal from "components/UploadRecordModal";

function StartButton({ setRefreshToken }){
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
        icon="Vlt-icon-play" 
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
export default StartButton;