import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

import DeliveredCampaignChart from "components/DeliveredCampaignChart";
import AverageDeliveryTimeCard from "components/AverageDeliveryTimeCard";

import DeliveryRateCard from "./DeliveryRateCard";

const useStyles = makeStyles(() => ({
  
}))

function DashboardPage(){
  const mStyles = useStyles();

  return (
    <React.Fragment>
      <div className="Vlt-grid">
        <div className="Vlt-col Vlt-col--2of3">
          {/* <DeliveryRateCard /> */}

          <div className="Vlt-grid">
            <div className="Vlt-col">
              {/* <DeliveredCampaignChart className="Vlt-card--border" height={70} overall /> */}
            </div>
          </div>

          <div className="Vlt-grid">
            <div className="Vlt-col">

            </div>
          </div>
        </div>
        <div className="Vlt-col Vlt-col--1of3">
          {/* <AverageDeliveryTimeCard /> */}
        </div>
      </div>
    </React.Fragment>
  );
}
export default DashboardPage;