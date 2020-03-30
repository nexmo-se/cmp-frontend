import React from "react";

import ButtonIcon from "components/ButtonIcon";
import UploadRecordModal from "components/UploadRecordModal";

function UploadButton({ disabled }){
  const [ visible, setVisible ] = React.useState(false);

  function handleClick(){
    setVisible((prevVisible) => !prevVisible);
  }

  return (
    <React.Fragment>
      <ButtonIcon 
        icon="Vlt-icon-upload" 
        onClick={handleClick}
        style={{ marginRight: 4 }}
        disabled={disabled}
      />
      <UploadRecordModal 
        visible={visible} 
        setVisible={setVisible} 
      />
    </React.Fragment>
  )
}
export default UploadButton;