import React from "react";

import SuccessMessage from "entities/success";
import { ErrorContext } from "contexts/error";

import AddCampaignModal from "components/AddCampaignModal";
import Step from "pages/QuickWizardPage/Step";

function CreateCampaignStep({ number, onAdded }){
  const [ visible, setVisible ] = React.useState(false);
  const { throwSuccess } = React.useContext(ErrorContext);

  function handleClick(){
    setVisible(true);
  }

  function handleAdded(){
    throwSuccess(new SuccessMessage("Campaign has been added"));
    if(onAdded) onAdded();
  }

  return (
    <React.Fragment>
      <Step 
        number={number}
        label="Create your Campaign"
        buttonLabel="Create Campaign"
        onClick={handleClick}
      />
      <AddCampaignModal 
        visible={visible}
        setVisible={setVisible}
        onAdded={handleAdded}
      />
    </React.Fragment>
  )
}
export default CreateCampaignStep;