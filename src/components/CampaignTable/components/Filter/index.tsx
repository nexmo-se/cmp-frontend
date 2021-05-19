import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

import FilterButton from "../FilterButton";

interface FilterProps {
  onChange: (filter: string) => void;
}

function Filter ({ onChange }: FilterProps) {
  const [filter, setFilter] = useState("draft");
  const [cookies, setCookies] = useCookies([ "campaign_filter" ]);
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
      if (!onChange) return;

      setCookies("campaign_filter", filter, { path: "/" })
      onChange(filter);
    },
    [filter, onChange, setCookies]
  );

  useEffect(
    () => {
      setFilter(cookies.campaign_filter ?? "draft");
    },
    [cookies.campaign_filter]
  )

  return (
    <div className="Vlt-btn-group Vlt-btn-group--app">
      {
        filters.map(
          (filterData) => (
            <FilterButton
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