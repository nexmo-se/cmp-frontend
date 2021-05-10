import SuccessMessage from "entities/success";
import { ErrorContext } from "contexts/error";

import { useState, useContext } from "react";

import AddApplicationModal from "components/AddApplicationModal";
import Step from "../Step";

interface CreateApplicationStepProps {
  refreshToken: string;
  number: number;
  onCreated: () => void;
}

function CreateApplicationStep ({ refreshToken, number, onCreated }: CreateApplicationStepProps) {
  const [visible, setVisible] = useState(false);
  const { throwSuccess } = useContext(ErrorContext);

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
        refreshToken={refreshToken}
      />
    </>
  )
}
export default CreateApplicationStep;