// @flow
import React from "react";

import Application from "entities/application";
import useApplication from "hooks/application";
import useUser from "hooks/user";
import useError from "hooks/error";

import Dropdown from "components/Dropdown";

type Props = {
  label:string,
  value?:Application,
  onChange?:Function,
  disabled:boolean
}

function ApplicationDropdown({ label, value, onChange, ...props }:Props){
  const mUser = useUser();
  const mError = useError();
  const mApplication = useApplication(mUser.token);

  function handleChange(applicationId){
    if(onChange) onChange(new Application({ id: applicationId }));
  }

  React.useEffect(() => {
    mApplication.list().catch((err) => mError.throwError(err));
  }, [])

  return (
    <Dropdown 
      {...props}
      label={label}
      value={value?.id} 
      setValue={handleChange} 
    >
      <option>--- Please Select ---</option>
      {mApplication.data.map((application) => {
        return (
          <option value={application.id} key={application.id}>
            {application.name}
          </option>
        )
      })}
    </Dropdown>
  )
}
export default ApplicationDropdown;