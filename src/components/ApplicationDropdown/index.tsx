import Application from "entities/application";
import lodash from "lodash";
import useApplication from "hooks/application";
import { Dispatch, SetStateAction } from "react";

import Dropdown from "components/Dropdown";

interface ApplicationDropdownProps {
  label: string,
  value?: Application,
  onChange?: Dispatch<SetStateAction<Application | undefined>>;
  disabled?: boolean
}

function ApplicationDropdown (props: ApplicationDropdownProps) {
  const { label, value, onChange, ...others } = props;
  const { applications } = useApplication();

  function handleChange (applicationId: string) {
    if (onChange) {
      const application = lodash(applications).find({ id: applicationId });
      onChange(application);
    }
  }

  return (
    <Dropdown 
      {...others}
      label={label}
      value={value?.id ?? ""} 
      setValue={handleChange} 
    >
      <option>--- Please Select ---</option>
      {
        applications?.map(
          (application) => {
            return (
              <option
                value={application.id}
                key={application.id}
              >
                {application.name}
              </option>
            )
          }
        )
      }
    </Dropdown>
  )
}
export default ApplicationDropdown;