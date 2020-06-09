// @flow
import React from "react";

import APIKey from "entities/apiKey";
import useAPIKey from "hooks/apiKey";
import useUser from "hooks/user";
import useError from "hooks/error";

import Dropdown from "components/Dropdown";

type Props = {
  refreshToken?:string,
  label:string,
  value?:APIKey,
  onChange?:Function
}

function APIKeyDropdown({ refreshToken, label, value, onChange, ...props }:Props){
  const mUser = useUser();
  const mError = useError();
  const mKey = useAPIKey(mUser.token);

  function handleChange(keyId){
    if(onChange) onChange(new APIKey({ id: keyId }));
  }

  React.useEffect(() => {
    mKey.list().catch((err) => mError.throwError(err));
  }, [ refreshToken ])

  return (
    <Dropdown 
      {...props}
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