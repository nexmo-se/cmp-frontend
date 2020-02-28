import React from "react";
import moment from "moment-timezone";

import Dropdown from "components/Dropdown";

function TimezoneDropdown({ label, value=moment.tz.guess(), setValue }){
  const data = moment.tz.names();
  return (
    <Dropdown label={label} value={value} setValue={setValue}>
      {data.map((tz) => {
        return <option value={tz}>{tz}</option>
      })}
    </Dropdown>
  )
}
export default TimezoneDropdown