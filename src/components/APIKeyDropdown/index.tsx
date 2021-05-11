import ApiKey from "entities/apiKey";
import useApiKey from "hooks/apiKey";
import { DropdownProps } from "components/Dropdown";
import { Dispatch, SetStateAction } from "react";

import Dropdown from "components/Dropdown";

interface ApiKeyDropdownProps extends DropdownProps {
  label: string,
  value?: ApiKey,
  onChange?: Dispatch<SetStateAction<Apikey>>;
}

function APIKeyDropdown (props: ApiKeyDropdownProps) {
  const { label, value, onChange, ...others } = props;
  const { apiKeys } = useApiKey();

  function handleChange (keyId) {
    if (onChange) {
      const apiKey = new ApiKey({id: keyId });
      onChange(apiKey);
    }
  }

  return (
    <Dropdown 
      {...others}
      label={label} 
      value={value?.id} 
      setValue={handleChange}
    >
      <option>--- Please Select ---</option>
      {
        apiKeys.map(
          (apiKey) => {
            return (
              <option value={apiKey.id} key={apiKey.id}>
                {apiKey.name} ({apiKey.key})
              </option>
            )
          }
        )
      }
    </Dropdown>
  )
}
export default APIKeyDropdown;