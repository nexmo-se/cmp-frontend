import { useForm } from "../Form";
import LoadingButton from "components/LoadingButton";

function SubmitButton () {
  const { isClean, isSubmitting } = useForm();

  return (
    <LoadingButton 
      disabled={!isClean}
      loading={isSubmitting} 
      buttonType="submit"
    >
      Add New
    </LoadingButton>
  )
}

export default SubmitButton;
