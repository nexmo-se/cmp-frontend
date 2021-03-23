import React from "react";
import { v4 as uuid } from "uuid";

import ButtonIcon from "components/ButtonIcon";
import EditAPIKeyModal from "components/EditAPIKeyModal";

function EditButton({ className, apiKey, setRefreshToken }){
  const [ visible, setVisible ] = React.useState(false);

  function handleClick(){
    setVisible(true);
  }

  function handleEdited(){
    setRefreshToken(uuid());
  }

  return (
    <React.Fragment>
      <ButtonIcon 
        className={className}
        icon="Vlt-icon-edit" 
        onClick={handleClick} 
      />
      <EditAPIKeyModal 
        visible={visible}
        setVisible={setVisible}
        apiKey={apiKey}
        onEdited={handleEdited}
      />
    </React.Fragment>
  );
}

export default EditButton;