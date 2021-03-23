// @flow
import React from "react";

import useTemplate from "hooks/template";
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Dropdown from "components/Dropdown";
import Template from "entities/template";

interface TemplateDropdownProps {
  refreshToken?: string;
  label: string;
  value?: Template;
  onChange?: (template: Template) => void;
}

function TemplateDropdown ({ refreshToken, label, value, onChange, ...props }: TemplateDropdownProps) {
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mTemplate = useTemplate(token);

  function handleChange (templateId) {
    if (onChange) {
      const template = new Template({ id: templateId });
      onChange(template);
    }  
  }

  React.useEffect(
    () => {
      mTemplate.list().catch((err) => throwError(err));
    },
    [refreshToken]
  )

  return (
    <Dropdown 
      {...props}
      label={label} 
      value={value?.id} 
      setValue={handleChange} 
    >
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