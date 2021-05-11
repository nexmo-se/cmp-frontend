import { useForm } from "../Form";
import Button from "components/Button";

interface CancelButton {
  onClick: () => void;
}

function CancelButton ({ onClick }) {
  const { isSubmitting } = useForm();

  return (
    <Button 
      type="tertiary" 
      onClick={onClick}
      disabled={isSubmitting}
    >
      Cancel
    </Button>
  )
}

export default CancelButton;
