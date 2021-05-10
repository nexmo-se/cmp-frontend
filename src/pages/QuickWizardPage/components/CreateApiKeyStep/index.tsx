import React from "react";

import SuccessMessage from "entities/success";
import { ErrorContext } from "contexts/error";

import { useState, useContext } from "react";

import AddAPIKeyModal from "components/AddAPIKeyModal";
import Step from "../Step";

interface CreateApiKeyProps {
  number?: number;
  onCreated: () => void;
}

function CreateAPIKeyStep ({ number, onCreated }: CreateApiKeyProps) {
  const [visible, setVisible] = useState(false);
  const { throwSuccess } = useContext(ErrorContext);

  function handleClick(){
    setVisible(true);
  }

  function handleAdded () {
    throwSuccess(new SuccessMessage("API Key has been added"));
    if (onCreated) onCreated();
  }

  return (
    <React.Fragment>
      <Step 
        number={number} 
        label="Create your API Key"
        buttonLabel="Create API Key"
        onClick={handleClick}
      />
      <AddAPIKeyModal 
        visible={visible} 
        setVisible={setVisible} 
        onAdded={handleAdded}
      />
    </React.Fragment>
  )
}
export default CreateAPIKeyStep;