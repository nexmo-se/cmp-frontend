import { useForm } from "../Form";

import TextInput from "components/TextInput";
import PasswordInput from "components/PasswordInput";

function FormContent () {
  const {
    name,
    apiKey,
    apiSecret,
    setName,
    setApiKey,
    setApiSecret
  } = useForm();

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
        setValue={setApiKey}
      />
      <PasswordInput 
        label="API Secret" 
        value={apiSecret}
        setValue={setApiSecret}
      />
    </>
  )
}

export default FormContent;
