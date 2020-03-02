import React from "react";

import SuccessMessage from "entities/success";
import { ErrorContext } from "contexts/error";

import AddChannelModal from "components/AddChannelModal";
import Step from "pages/QuickWizardPage/Step";

function CreateChannelStep({ disableSMS=false, number }){
  const [ visible, setVisible ] = React.useState(false);
  const { throwSuccess } = React.useContext(ErrorContext);

  function handleClick(){
    setVisible(true);
  }

  function handleAdded(){
    throwSuccess(new SuccessMessage("Channel has been added"));
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
      />
    </React.Fragment>
  )
}
export default CreateChannelStep;