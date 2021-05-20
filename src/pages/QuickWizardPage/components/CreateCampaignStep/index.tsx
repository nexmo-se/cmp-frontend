import SuccessMessage from "entities/success";
import Campaign from "entities/campaign";

import useError from "hooks/error";
import { useStep } from "../StepProvider";
import { useState, useEffect } from "react";

import AddCampaignModal from "components/AddCampaignModal";
import Step from "../Step";
import { DateTime } from "luxon";

interface CreateCampaignStepProps {
  number?: number;
  onCreated?: () => void;
}

function CreateCampaignStep ({ number = 0, onCreated }: CreateCampaignStepProps) {
  const [visible, setVisible] = useState(false);
  const [prefilledCampaign, setPrefilledCampaign] = useState<Campaign>();
  const { throwSuccess } = useError();
  const { funnel } = useStep();

  function handleClick () {
    setVisible(true);
  }

  function handleAdded () {
    const message = new SuccessMessage("Campaign has been added");
    throwSuccess(message);
    
    if(onCreated) onCreated();
  }

  /**
   * Set prefilledCampaign only for number-insight funnel.
   * This will make sure that quick wizard only name field.
   */
  useEffect(
    () => {
      if (funnel === "number-insight") {
        const startDate = DateTime.utc().startOf("day");
        const endDate = DateTime.utc().endOf("day");

        const campaign = new Campaign({
          id: "1111", // create dummy number. This will be ignored
          name: "",
          campaignStartDate: startDate,
          campaignEndDate: endDate,
          status: "draft",
          activeStartHour: parseInt(startDate.toFormat("HH")),
          activeStartMinute: parseInt(startDate.toFormat("mm")),
          activeEndHour: parseInt(endDate.toFormat("HH")),
          activeEndMinute: parseInt(endDate.toFormat("mm")),
          activeOnWeekends: true,
          timezone: DateTime.utc().zoneName
        });
        setPrefilledCampaign(campaign);
      } else {
        setPrefilledCampaign(undefined);
      }
    },
    [funnel]
  )

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
        campaign={prefilledCampaign}
        type={funnel === "number-insight"? "number_insight": "default"}
      />
    </>
  )
}
export default CreateCampaignStep;