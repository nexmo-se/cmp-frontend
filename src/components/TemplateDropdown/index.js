import React from "react";

import useTemplate from "hooks/template";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Dropdown from "components/Dropdown";

function TemplateDropdown({ refreshToken, label, value, setValue, disabled }){
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mTemplate = useTemplate(token);

  React.useEffect(() => {
    mTemplate.list().catch((err) => throwError(err));
  }, [ refreshToken ])

  return (
    <Dropdown label={label} value={value} setValue={setValue} disabled={disabled}>
      <option>--- Please Select ---</option>
      {mTemplate.data.map((template) => {
        return (
          <option value={template.id} key={template.id}>
            {template.name}
          </option>
        )
      })}
    </Dropdown>
  )
}
export default TemplateDropdown;