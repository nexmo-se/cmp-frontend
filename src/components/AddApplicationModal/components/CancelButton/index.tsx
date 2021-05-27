import { useForm } from "../Form";
import Button from "components/Button";

interface CancelButtonProps {
  onClick: () => void;
}

function CancelButton ({ onClick }: CancelButtonProps) {
  const { isSubmitting } = useForm();

  return (
    <Button 
      type="tertiary" 
      disabled={isSubmitting} 
      onClick={onClick}
    >
      Cancel
    </Button>
  )
}

export default CancelButton;
