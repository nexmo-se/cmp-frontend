import SuccessMessage from "entities/success";

import useError from "hooks/error";
import { useState } from "react";

import AddAPIKeyModal from "components/AddAPIKeyModal";
import Step from "../Step";

interface CreateApiKeyProps {
  number?: number;
  onCreated?: () => void;
}

function CreateAPIKeyStep ({ number = 0, onCreated }: CreateApiKeyProps) {
  const [visible, setVisible] = useState(false);
  const { throwSuccess } = useError();

  function handleClick () {
    setVisible(true);
  }

  function handleAdded () {
    throwSuccess(new SuccessMessage("API Key has been added"));
    if (onCreated) onCreated();
  }

  return (
    <>
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
    </>
  )
}
export default CreateAPIKeyStep;