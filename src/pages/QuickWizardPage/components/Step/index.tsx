import styles from "./Step.module.css";
import Button from "components/Button";

interface StepProps {
  number: number;
  label: string;
  buttonLabel: string;
  onClick: () => void;
}

function Step({ number, label, buttonLabel, onClick }: StepProps){
  return (
    <div className={styles.container}>
      <div>
        <span className="Vlt-number" data-index={number} />
        <span className="p-large">{label}</span>
      </div>
      <Button 
        type="tertiary" 
        onClick={onClick}
        className={styles.button}
      >
        {buttonLabel}
      </Button>
    </div>
  )
}

export default Step;