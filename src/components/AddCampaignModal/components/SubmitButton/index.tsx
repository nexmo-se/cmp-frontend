import LoadingButton from "components/LoadingButton";
import { useForm } from "../Form";

function SubmitButton () {
  const { isSubmitting, isClean } = useForm();

  return (
    <LoadingButton 
      loading={isSubmitting}
      disabled={!isClean}
      buttonType="submit"
    >
      Add New
    </LoadingButton>
  )
}

export default SubmitButton;
