import React from "react";

import ButtonIcon from "components/ButtonIcon";
import UploadRecordModal from "components/UploadRecordModal";

function StartButton(){
  const [ visible, setVisible ] = React.useState(false);

  function handleClick(){
    setVisible((prevVisible) => !prevVisible);
  }

  return (
    <React.Fragment>
      <ButtonIcon 
        icon="Vlt-icon-play" 
        onClick={handleClick}
        style={{ marginRight: 4 }}
      />
      <UploadRecordModal visible={visible} setVisible={setVisible} />
    </React.Fragment>
  )
}
export default StartButton;