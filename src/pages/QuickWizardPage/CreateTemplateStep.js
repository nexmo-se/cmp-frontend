import React from "react";

import SuccessMessage from "entities/success";
import { ErrorContext } from "contexts/error";

import AddTemplateModal from "components/AddTemplateModal";
import Step from "./Step";

function CreateTemplateStep({ number, refreshToken, onCreated }){
  const [ visible, setVisible ] = React.useState(false);
  const { throwSuccess } = React.useContext(ErrorContext);

  function handleClick(){
    setVisible(true);
  }

  function handleAdded(){
    throwSuccess(new SuccessMessage("Template has been added"));
    if(onCreated) onCreated()
  }

  return (
    <React.Fragment>
      <Step 
        number={number}
        label="Create your Template"
        buttonLabel="Create Template"
        onClick={handleClick}
      />
      <AddTemplateModal 
        visible={visible}
        setVisible={setVisible}
        onAdded={handleAdded}
        refreshToken={refreshToken}
      />
    </React.Fragment>
  )
}
export default CreateTemplateStep;