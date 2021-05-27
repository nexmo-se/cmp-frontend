import { useForm } from "../Form";
import LoadingButton from "components/LoadingButton";

function SubmitButton () {
  const { isSubmitting, isClean } = useForm();

  return (
    <LoadingButton 
      loading={isSubmitting} 
      disabled={!isClean}
      buttonType="submit"
    >
      Edit
    </LoadingButton>
  )
}

export default SubmitButton;
