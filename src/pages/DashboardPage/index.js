import React from "react";

import PageContainer from "components/PageContainer";
import SideNavigation from "components/SideNavigation";
import SectionContainer from "components/SectionContainer";
import DeliveryStatsCard from "components/DeliveryStatsCard";
import DeliveredCampaignChart from "components/DeliveredCampaignChart";
import AverageDeliveryTimeCard from "components/AverageDeliveryTimeCard";

function DashboardPage(props){

  return (
    <PageContainer>
      <SideNavigation menuActive={{ dashboard: true }}/>
      <SectionContainer>
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
      </SectionContainer>
    </PageContainer>
  );
}
export default DashboardPage;