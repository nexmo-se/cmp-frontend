import React from "react";

import DeliveryStatsCard from "components/DeliveryStatsCard";
import DeliveredCampaignChart from "components/DeliveredCampaignChart";
import AverageDeliveryTimeCard from "components/AverageDeliveryTimeCard";

function DashboardPage(){
  return (
    <React.Fragment>
      <div className="Vlt-grid">
        <div className="Vlt-col Vlt-col--2of3">
          <div className="Vlt-grid">
            <div className="Vlt-col">
              <DeliveryStatsCard channel="sms" now={90} then={80}/>
            </div>
            <div className="Vlt-col">
              <DeliveryStatsCard channel="WhatsApp" now={80} then={60}/>
            </div>
          </div>

          <div className="Vlt-grid">
            <div className="Vlt-col">
              <DeliveredCampaignChart height={70}/>
            </div>
          </div>

          <div className="Vlt-grid">
            <div className="Vlt-col">

            </div>
          </div>
        </div>
        <div className="Vlt-col Vlt-col--1of3">
          <AverageDeliveryTimeCard/>
        </div>
      </div>
    </React.Fragment>
  );
}
export default DashboardPage;