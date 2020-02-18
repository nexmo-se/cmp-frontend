import React from "react";

import SuccessMessage from "entities/success";
import { ErrorContext } from "contexts/error";

import Step from "pages/QuickWizardPage/Step";
import AddTemplateModal from "components/AddTemplateModal";

function CreateTemplateStep({ number }){
  const [ visible, setVisible ] = React.useState(false);
  const { throwSuccess } = React.useContext(ErrorContext);

  function handleClick(){
    setVisible(true);
  }

  function handleAdded(){
    throwSuccess(new SuccessMessage("Template has been added"));
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
      />
    </React.Fragment>
  )
}
export default CreateTemplateStep;