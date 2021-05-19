import ApiKey from "entities/apiKey";
import useApiKey from "hooks/apiKey";
import lodash from "lodash";
import { DropdownProps } from "components/Dropdown";

import Dropdown from "components/Dropdown";

interface MainProps {
  label: string,
  value?: ApiKey,
  onChange?: (apiKey: ApiKey) => void;
}

type ApiKeyDropdownProps = MainProps & Omit<DropdownProps, "children" | "value">;

function APIKeyDropdown (props: ApiKeyDropdownProps) {
  const { label, value, onChange, ...others } = props;
  const { apiKeys } = useApiKey();

  function handleChange (keyId: string) {
    if (onChange) {
      const apiKey = lodash(apiKeys).find({ id: keyId });
      if (apiKey) onChange(apiKey);
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