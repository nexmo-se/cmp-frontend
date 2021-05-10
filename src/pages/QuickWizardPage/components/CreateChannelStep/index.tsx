import SuccessMessage from "entities/success";
import { ErrorContext } from "contexts/error";

import { useState, useContext } from "react";
import { useStep } from "../StepProvider";

import AddChannelModal from "components/AddChannelModal";
import Step from "../Step";

interface CreateChannelStepProps {
  refreshToken: string;
  number?: number;
  onCreated: () => void;
}

function CreateChannelStep ({ number, refreshToken, onCreated }: CreateChannelStepProps) {
  const [visible, setVisible] = useState(false);
  const { throwSuccess } = useContext(ErrorContext);
  const { funnel } = useStep();

  function handleClick () {
    setVisible(true);
  }

  function handleAdded () {
    throwSuccess(new SuccessMessage("Channel has been added"));
    if (onCreated) onCreated();
  }

  return (
    <>
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
        disabledChannels={
          (funnel === "voice")
          ? ["sms", "viber", "whatsapp", "number_insight"] // if the funnel is voice
          : (funnel === "number-insight")
          ? ["sms", "viber", "whatsapp", "voice"] // if the funnel is number-insight
          : (funnel === "social-channel")
          ? ["sms", "number_insight", "voice"] // If the funnel is social-channel
          : ["number_insight", "voice", "whatsapp", "viber"] // If the funnel is sms
        }
        refreshToken={refreshToken}
      />
    </>
  )
}
export default CreateChannelStep;