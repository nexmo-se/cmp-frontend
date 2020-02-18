import React from "react";

import SuccessMessage from "entities/success";
import { ErrorContext } from "contexts/error";

import AddAPIKeyModal from "components/AddAPIKeyModal";
import Step from "pages/QuickWizardPage/Step";

function CreateAPIKeyStep({ number }){
  const [ visible, setVisible ] = React.useState(false);
  const { throwSuccess } = React.useContext(ErrorContext);

  function handleClick(){
    setVisible(true);
  }

  function handleAdded(){
    throwSuccess(new SuccessMessage("API Key has been added"));
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