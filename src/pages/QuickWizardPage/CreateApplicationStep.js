import React from "react";

import SuccessMessage from "entities/success";
import { ErrorContext } from "contexts/error";

import AddApplicationModal from "components/AddApplicationModal";
import Step from "pages/QuickWizardPage/Step";

function CreateApplicationStep({ number }){
  const [ visible, setVisible ] = React.useState(false);
  const { throwSuccess } = React.useContext(ErrorContext);

  function handleAdded(){
    throwSuccess(new SuccessMessage("Application has been added"));
  }

  function handleClick(){
    setVisible(true);
  }

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}
export default CreateApplicationStep;