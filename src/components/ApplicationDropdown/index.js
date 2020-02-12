import React from "react";

import useApplication from "hooks/application";
import { UserContext } from "contexts/user";

import Dropdown from "components/Dropdown";

function ApplicationDropdown({ label, value, setValue, disabled }){
  const { token } = React.useContext(UserContext);
  const mApplication = useApplication(token);

  React.useEffect(() => {
    mApplication.list();
  }, [])

  return (
    <Dropdown label={label} value={value} setValue={setValue} disabled={disabled}>
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