import styles from "./ChannelSelectionStep.module.css";

import { useState } from "react";
import { useStep } from "../StepProvider";

import Dropdown from "components/Dropdown";

interface ChannelSelectionStepProps {
  number?: number;
}

interface OptionItem {
  value: string;
  label: string;
}

function ChannelSelectionStep ({ number }: ChannelSelectionStepProps) {
  const { funnel, setFunnel } = useStep();
  const [items] = useState<OptionItem[]>([
    { value: "sms", label: "SMS" },
    { value: "voice", label: "Voice" },
    { value: "social-channel", label: "Social Channel"},
    { value: "number-insight", label: "Number Insight" }
  ]);

  return (
    <div className={styles.container}>
      <div>
        <span className="Vlt-number" data-index={number} />
        <span className="p-large">Select Funnel</span>
      </div>
      <Dropdown 
        className={styles.dropdown}
        value={funnel} 
        setValue={setFunnel}
      >
        {
          items.map(
            (item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            )
          )
        }
      </Dropdown>
    </div>
  )
}
export default ChannelSelectionStep;