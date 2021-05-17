import Template from "entities/template";
import lodash from "lodash";
import useTemplate from "hooks/template";
import { Dispatch, SetStateAction } from "react";

import Dropdown from "components/Dropdown";

interface TemplateDropdownProps {
  label: string;
  value?: Template;
  onChange?: Dispatch<SetStateAction<Template>>;
  disabled?: boolean;
}

function TemplateDropdown ({ label, value, onChange, ...props }: TemplateDropdownProps) {
  const { templates } = useTemplate();

  function handleChange (templateId) {
    if (!templates) return;

    const foundTemplate = lodash(templates).find({ id: templateId });
    if (!foundTemplate) return;
    if (onChange) onChange(template);
  }

  return (
    <Dropdown 
      {...props}
      label={label} 
      value={value?.id} 
      setValue={handleChange} 
    >
      <option>--- Please Select ---</option>
      {
        templates?.map(
          (template) => {
            return (
              <option value={template.id} key={template.id}>
                {template.name}
              </option>
            )
          }
        )
      }
    </Dropdown>
  )
}
export default TemplateDropdown;