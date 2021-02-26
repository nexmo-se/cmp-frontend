import React from "react";
import clsx from "clsx";
import { useCookies } from "react-cookie";

import Button from "components/Button";

function Filter({ onChange }){
  const [ filter, setFilter ] = React.useState("draft");
  const [ cookies, setCookies ] = useCookies([ "campaign_filter" ]);

  React.useEffect(() => {
    if(onChange) {
      setCookies("campaign_filter", filter, { path: "/" })
      onChange(filter);
    }
  }, [ filter ]);

  React.useEffect(() => {
    console.log(cookies.campaign_filter)
    setFilter(cookies.campaign_filter || "draft");
  }, [])

  return (
    <div className="Vlt-btn-group Vlt-btn-group--app">
      <Button 
        className={clsx(
          (filter === "all")? "Vlt-btn_active": ""
        )}
        onClick={() => setFilter("all")}
      >
        All
      </Button>
      <Button 
        className={clsx(
          (filter === "draft")? "Vlt-btn_active": ""
        )}
        onClick={() => setFilter("draft")}
      >
        Draft
      </Button>
      <Button 
        className={clsx(
          (filter === "pending")? "Vlt-btn_active": ""
        )}
        onClick={() => setFilter("pending")}
      >
        Pending
      </Button>
      <Button 
        className={clsx(
          (filter === "paused")? "Vlt-btn_active": ""
        )}
        onClick={() => setFilter("paused")}
      >
        Paused
      </Button>
      <Button 
        className={clsx(
          (filter === "started")? "Vlt-btn_active": ""
        )}
        onClick={() => setFilter("started")}
      >
        Started
      </Button>
      <Button 
        className={clsx(
          (filter === "reporting|completed")? "Vlt-btn_active": ""
        )}
        onClick={() => setFilter("reporting|completed")}
      >
        Completed
      </Button>
    </div>
  )
}
export default Filter;