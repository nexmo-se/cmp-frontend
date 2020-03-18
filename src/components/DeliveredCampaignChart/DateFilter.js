import React from "react";

import FilterButton from "./FilterButton";

function DateFilter(){
  const [ selected, setSelected ] = React.useState("day");
  
  function handleDayClick(){ setSelected("day") }

  function handleWeekClick(){ setSelected("week") }

  function handleMonthClick(){ setSelected("month") }

  return (
    <div className="Vlt-col Vlt-right">
      <FilterButton 
        active={selected === "day"}
        onClick={handleDayClick}
      >
        Day
      </FilterButton>

      <FilterButton 
        active={selected === "week"}
        onClick={handleWeekClick}
      >
        Week
      </FilterButton>

      <FilterButton 
        active={selected === "month"}
        onClick={handleMonthClick}
      >
        Month
      </FilterButton>
    </div>
  )
}
export default DateFilter;