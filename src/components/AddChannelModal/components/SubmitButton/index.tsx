import LoadingButton from "components/LoadingButton";
import { useForm } from "../Form";

function SubmitButton () {
  const { isAdding, isClean } = useForm();
  
  return (
    <LoadingButton
      loading={isAdding}
      disabled={!isClean}
      buttonType="submit"
    >
      Add New
    </LoadingButton>
  )
}

export default SubmitButton;
