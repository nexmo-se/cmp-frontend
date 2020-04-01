import React from "react";
import clsx from "clsx";

import Button from "components/Button";

function Filter({ onChange }){
  const [ filter, setFilter ] = React.useState("draft");

  React.useEffect(() => {
    if(onChange) onChange(filter);
  }, [ filter ])

  return (
    <div className="Vlt-btn-group">
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
          (filter === "started")? "Vlt-btn_active": ""
        )}
        onClick={() => setFilter("Started")}
      >
        Started
      </Button>
      <Button 
        className={clsx(
          (filter === "completed")? "Vlt-btn_active": ""
        )}
        onClick={() => setFilter("completed")}
      >
        Completed
      </Button>
    </div>
  )
}
export default Filter;