import moment from "moment-timezone";
import Dropdown from "components/Dropdown";
import { Dispatch, SetStateAction } from "react";

interface TimezoneDropdownProps {
  label: string;
  value?: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function TimezoneDropdown ({ label, value, setValue }: TimezoneDropdownProps) {
  const data = moment.tz.names();
  return (
    <Dropdown
      label={label}
      value={value ?? moment.tz.guess()}
      setValue={setValue}
    >
      {
        data.map(
          (tz) => {
            return (
              <option
                value={tz}
                key={tz}
              >
                {tz}
              </option>
            )
          }
        )
      }
    </Dropdown>
  )
}
export default TimezoneDropdown