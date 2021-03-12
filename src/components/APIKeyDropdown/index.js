// @flow
import React from "react";

import ApiKey from "entities/apiKey";
import useAPIKey from "hooks/apiKey";
import useUser from "hooks/user";
import useError from "hooks/error";

import Dropdown from "components/Dropdown";

interface ApiKeyDropdownProps {
  refreshToken?: string,
  label: string,
  value: ?ApiKey,
  onChange?: (value: ApiKey) => void
}

function APIKeyDropdown (props: ApiKeyDropdownProps) {
  const { refreshToken, label, value, onChange, ...others } = props;

  const mUser = useUser();
  const mError = useError();
  const mKey = useAPIKey(mUser.token);

  function handleChange (keyId) {
    if (onChange) onChange(new ApiKey({ id: keyId }));
  }

  React.useEffect(
    () => {
      mKey.list().catch((err) => mError.throwError(err));
    },
    [refreshToken]
  )

  return (
    <Dropdown 
      {...others}
      label={label} 
      value={value?.id} 
      setValue={handleChange}
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