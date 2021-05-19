import SuccessMessage from "entities/success";

import useError from "hooks/error";
import { useState } from "react";
import { useStep } from "../StepProvider";

import AddChannelModal from "components/AddChannelModal";
import Step from "../Step";

interface CreateChannelStepProps {
  number?: number;
  onCreated?: () => void;
  acceptedFunnels: string[];
}

function CreateChannelStep ({ number = 0, onCreated }: CreateChannelStepProps) {
  const [visible, setVisible] = useState(false);
  const { throwSuccess } = useError();
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
      />
    </>
  )
}
export default CreateChannelStep;