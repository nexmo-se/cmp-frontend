import React from "react";

import SuccessMessage from "entities/success";
import { ErrorContext } from "contexts/error";

import AddCampaignModal from "components/AddCampaignModal";
import Step from "../Step";

function CreateCampaignStep({ number, onCreated }){
  const [ visible, setVisible ] = React.useState(false);
  const { throwSuccess } = React.useContext(ErrorContext);

  function handleClick(){
    setVisible(true);
  }

  function handleAdded(){
    throwSuccess(new SuccessMessage("Campaign has been added"));
    if(onCreated) onCreated();
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