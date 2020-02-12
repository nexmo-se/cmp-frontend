import React from "react";

import useAPIKey from "hooks/apiKey";
import { UserContext } from "contexts/user";

import Dropdown from "components/Dropdown";

function APIKeyDropdown({ label, value, setValue }){
  const { token } = React.useContext(UserContext);
  const mKey = useAPIKey(token);

  React.useEffect(() => {
    mKey.list();
  }, [])

  return (
    <Dropdown label={label} value={value} setValue={setValue}>
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