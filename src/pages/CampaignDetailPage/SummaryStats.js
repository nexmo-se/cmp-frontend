import React from "react";

import RejectedCard from "./RejectedCard";
import DeliveryCard from "./DeliveryCard";
import TimeTakenCard from "./TimeTakenCard";

function SummaryStats({ report, children }){
  return (
    <div className="Vlt-grid">
      {children.map((child) => {
        if(!child) return null;
        const newComponent = React.cloneElement(child, { report });
        return (
          <div className="Vlt-col">
            {newComponent}
          </div>
        )
      })}
    </div>
  )
}
export default SummaryStats;