import SuccessMessage from "entities/success";

import useError from "hooks/error";
import { useState } from "react";

import AddTemplateModal from "components/AddTemplateModal";
import Step from "../Step";

interface CreateTemplateStepProps {
  number?: number;
  onCreated?: () => void;
  acceptedFunnels: string[];
}

function CreateTemplateStep ({ number = 0, onCreated }: CreateTemplateStepProps) {
  const [visible, setVisible] = useState(false);
  const { throwSuccess } = useError();

  function handleClick () {
    setVisible(true);
  }

  function handleAdded () {
    throwSuccess(new SuccessMessage("Template has been added"));
    if(onCreated) onCreated()
  }

  return (
    <>
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
      />
    </>
  )
}
export default CreateTemplateStep;