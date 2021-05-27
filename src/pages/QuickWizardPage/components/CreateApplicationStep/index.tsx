import SuccessMessage from "entities/success";

import useError from "hooks/error";
import { useState } from "react";

import AddApplicationModal from "components/AddApplicationModal";
import Step from "../Step";

interface CreateApplicationStepProps {
  number?: number;
  onCreated?: () => void;
  acceptedFunnels: string[];
}

function CreateApplicationStep ({ number = 0, onCreated }: CreateApplicationStepProps) {
  const [visible, setVisible] = useState(false);
  const { throwSuccess } = useError();

  function handleAdded () {
    throwSuccess(new SuccessMessage("Application has been added"));
    if (onCreated) onCreated();
  }

  function handleClick () {
    setVisible(true);
  }

  return (
    <>
      <Step 
        number={number}
        label="Create your Application"
        buttonLabel="Create Application"
        onClick={handleClick}
      />
      <AddApplicationModal 
        visible={visible}
        setVisible={setVisible}
        onAdded={handleAdded}
      />
    </>
  )
}
export default CreateApplicationStep;