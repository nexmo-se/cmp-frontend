import React from "react";

import useTemplate from "hooks/template";
import { UserContext } from "contexts/user";

import Dropdown from "components/Dropdown";

function TemplateDropdown({ label, value, setValue, disabled }){
  const { token } = React.useContext(UserContext);
  const mTemplate = useTemplate(token);

  React.useEffect(() => {
    mTemplate.list();
  }, [])

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