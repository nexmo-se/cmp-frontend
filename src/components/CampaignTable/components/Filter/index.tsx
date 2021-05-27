import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

import FilterButton from "../FilterButton";

interface FilterProps {
  onChange: (filter: string) => void;
}

function Filter ({ onChange }: FilterProps) {
  const [cookies, setCookies] = useCookies([ "campaign_filter" ]);
  const [filter, setFilter] = useState<string>(cookies.campaign_filter ?? "draft");
  const filters = [
    { id: "all", label: "All" },
    { id: "draft", label: "Draft" },
    { id: "pending", label: "Pending" },
    { id: "paused", label: "Paused" },
    { id: "started", label: "Started" },
    { id: "reporting|completed", label: "Completed" }
  ]

  useEffect(
    () => {
      setCookies("campaign_filter", filter, { path: "/" })

      if (!onChange) return;
      onChange(filter);
    },
    [filter, onChange, setCookies]
  );


  return (
    <div className="Vlt-btn-group Vlt-btn-group--app">
      {
        filters.map(
          (filterData) => (
            <FilterButton
              key={filterData.id}
              id={filterData.id}
              currentFilter={filter}
              label={filterData.label}
              onClick={() => setFilter(filterData.id)}
            />
          )
        )
      }
    </div>
  )
}
export default Filter;