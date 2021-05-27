import Button from "components/Button";
import { useForm } from "../Form";

interface CancelButtonProps {
  onClick: () => void;
}

function CancelButton ({ onClick }: CancelButtonProps) {
  const { isAdding } = useForm();

  return (
    <Button
      type="tertiary"
      onClick={onClick}
      disabled={isAdding}
    >
      Cancel
    </Button>
  )
}

export default CancelButton;
