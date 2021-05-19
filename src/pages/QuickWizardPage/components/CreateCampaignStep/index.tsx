import SuccessMessage from "entities/success";

import useError from "hooks/error";
import { useState } from "react";

import AddCampaignModal from "components/AddCampaignModal";
import Step from "../Step";

interface CreateCampaignStepProps {
  number?: number;
  onCreated?: () => void;
}

function CreateCampaignStep ({ number = 0, onCreated }: CreateCampaignStepProps) {
  const [visible, setVisible] = useState(false);
  const { throwSuccess } = useError();

  function handleClick () {
    setVisible(true);
  }

  function handleAdded(){
    throwSuccess(new SuccessMessage("Campaign has been added"));
    if(onCreated) onCreated();
  }

  return (
    <>
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
    </>
  )
}
export default CreateCampaignStep;