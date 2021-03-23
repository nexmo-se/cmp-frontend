// @flow
import React from "react";

import Application from "entities/application";
import useApplication from "hooks/application";
import useUser from "hooks/user";
import useError from "hooks/error";

import Dropdown from "components/Dropdown";

interface ApplicationDropdownProps {
  label: string,
  value: ?Application,
  onChange?: (value: Application) => void,
  disabled: boolean
}

function ApplicationDropdown (props: ApplicationDropdownProps) {
  const { label, value, onChange, ...others } = props;

  const { token } = useUser();
  const { throwError } = useError();
  const { data, list } = useApplication(token);

  function handleChange (applicationId) {
    if (onChange) onChange(new Application({ id: applicationId }));
  }

  React.useEffect(
    () => {
      list().catch((err) => throwError(err));
    },
    [list, throwError]
  )

  return (
    <Dropdown 
      {...others}
      label={label}
      value={value?.id} 
      setValue={handleChange} 
    >
      <option>--- Please Select ---</option>
      {data.map((application) => {
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