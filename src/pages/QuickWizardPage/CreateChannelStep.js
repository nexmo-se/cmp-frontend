import React from "react";

import SuccessMessage from "entities/success";
import { ErrorContext } from "contexts/error";

import AddChannelModal from "components/AddChannelModal";
import Step from "./Step";

function CreateChannelStep({ 
  refreshToken, 
  number,
  onCreated,
  disableSMS=false
}){
  const [ visible, setVisible ] = React.useState(false);
  const { throwSuccess } = React.useContext(ErrorContext);

  function handleClick(){
    setVisible(true);
  }

  function handleAdded(){
    throwSuccess(new SuccessMessage("Channel has been added"));
    if(onCreated) onCreated();
  }

  return (
    <React.Fragment>
      <Step 
        number={number}
        label="Create your Channel"
        buttonLabel="Create Channel"
        onClick={handleClick}
      />
      <AddChannelModal 
        visible={visible}
        setVisible={setVisible}
        onAdded={handleAdded}
        disableSMS={disableSMS}
        refreshToken={refreshToken}
      />
    </React.Fragment>
  )
}
export default CreateChannelStep;