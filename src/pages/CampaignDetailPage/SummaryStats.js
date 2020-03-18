import React from "react";

import RejectedCard from "pages/CampaignDetailPage/RejectedCard";
import DeliveryCard from "pages/CampaignDetailPage/DeliveryCard";
import TimeTakenCard from "pages/CampaignDetailPage/TimeTakenCard";

function SummaryStats({ campaign }){
  return (
    <div className="Vlt-grid">
      <div className="Vlt-col">
        <RejectedCard campaign={campaign} />
      </div>

      <div className="Vlt-col">
        <DeliveryCard campaign={campaign} />
      </div>

      <div className="Vlt-col">
        <TimeTakenCard campaign={campaign} />
      </div>
    </div>
  )
}
export default SummaryStats;