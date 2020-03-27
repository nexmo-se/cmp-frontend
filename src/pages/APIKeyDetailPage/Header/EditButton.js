import React from "react";
import { v4 as uuid } from "uuid";

import EditAPIKeyModal from "components/EditAPIKeyModal";
import Button from "components/Button";

function EditButton({ apiKey, setRefreshToken }){
  const [ visible, setVisible ] = React.useState(false);

  function handleClick(){
    setVisible(true);
  }

  function handleEdited(){
    setRefreshToken(uuid());
  }

  return (
    <React.Fragment>
      <Button type="tertiary" onClick={handleClick}>Edit</Button>
      <EditAPIKeyModal 
        apiKey={apiKey}
        visible={visible}
        setVisible={setVisible}
        onEdited={handleEdited}
      />
    </React.Fragment>
  )
}
export default EditButton;