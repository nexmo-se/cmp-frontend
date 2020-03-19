import React from "react";
import { useHistory } from "react-router-dom";

import Button from "components/Button";
import UploadRecordModal from "components/UploadRecordModal";

function UploadButton(){
  const [ visible, setVisible ] = React.useState(false);
  const mHistory = useHistory();

  function handleClick(){
    setVisible(true);
  }

  function handleUploaded(){
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