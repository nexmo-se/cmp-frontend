import { useForm } from "../Form";

import TextInput from "components/TextInput";
import PasswordInput from "components/PasswordInput";

function FormContent () {
  const { apiKey, name, setName } = useForm();

  return (
    <>
      <TextInput 
        label="Name" 
        value={name}
        setValue={setName}
      />
      <TextInput
        label="API Key"
        value={apiKey}
        disabled
      />
      <PasswordInput
        label="API Secret"
        value="*****"
        disabled
      />
    </>
  )
}

export default FormContent;
