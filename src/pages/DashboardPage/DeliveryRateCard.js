import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

import DeliveryStatsCard from "components/DeliveryStatsCard";

const useStyles = makeStyles(() => ({
  borderRight: {
    boxShadow: "inset -1px 0px 1px -1px #9b9da3",
    borderRight: "16px solid transparent"
  }
}))

function DeliveryRateCard(){
  const mStyles = useStyles();
  return (
    <div className="Vlt-card Vlt-card--border">
      <div className="Vlt-grid">
        <div className={clsx("Vlt-col", mStyles.borderRight)}>
          <DeliveryStatsCard channel="SMS" now={90} then={80}/>
        </div>
        <div className="Vlt-col">
          <DeliveryStatsCard channel="Social" now={80} then={60}/>
        </div>
      </div>
    </div>
  )
}
export default DeliveryRateCard;
