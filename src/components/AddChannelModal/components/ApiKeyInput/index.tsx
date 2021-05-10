import ApiKeyDropdown from "components/APIKeyDropdown";
import { useForm } from "../Form";

function ApiKeyInput () {
  const { apiKey, setApiKey } = useForm();

  return (
    <ApiKeyDropdown
      label="API Key"
      value={apiKey}
      onChange={setApiKey}
    />
  )
}

export default ApiKeyInput;
