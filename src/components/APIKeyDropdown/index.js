import React from "react";

import useAPIKey from "hooks/apiKey";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Dropdown from "components/Dropdown";

function APIKeyDropdown({ label, value, setValue, disabled }){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mKey = useAPIKey(token);

  React.useEffect(() => {
    mKey.list().catch((err) => throwError(err));
  }, [])

  return (
    <Dropdown 
      label={label} 
      value={value} 
      setValue={setValue}
      disabled={disabled}
    >
      <option>--- Please Select ---</option>
      {mKey.data.map((apiKey) => {
        return (
          <option value={apiKey.id} key={apiKey.id}>
            {apiKey.name} ({apiKey.key})
          </option>
        )
      })}
    </Dropdown>
  )
}
export default APIKeyDropdown;