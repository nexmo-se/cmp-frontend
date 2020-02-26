import React from "react";

import data from "components/TimezoneDropdown/data";

import Dropdown from "components/Dropdown";

function TimezoneDropdown({ label, value, setValue }){
  return (
    <Dropdown label={label} value={value} setValue={setValue}>
      {data.map((tz) => {
        return <option value={tz.value}>{tz.text}</option>
      })}
    </Dropdown>
  )
}
export default TimezoneDropdown