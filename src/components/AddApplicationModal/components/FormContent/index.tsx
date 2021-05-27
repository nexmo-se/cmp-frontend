import { useForm } from "../Form";

import TextInput from "components/TextInput";
import FileInput from "components/FileInput";
import ApiKeyDropdown from "components/APIKeyDropdown";

function FormContent () {
  const {
    name,
    applicationId,
    apiKey,
    setName,
    setApplicationId,
    setPrivateKey,
    setApiKey
  } = useForm();

  return (
    <>
      <TextInput
        label="Name"
        value={name}
        setValue={setName}
      />
      <TextInput
        label="Application ID"
        value={applicationId}
        setValue={setApplicationId}
      />
      <FileInput
        label="Private Key"
        setFile={setPrivateKey}
      />
      <ApiKeyDropdown
        label="API Key"
        value={apiKey}
        onChange={setApiKey}
      />
    </>
  )
}

export default FormContent;
