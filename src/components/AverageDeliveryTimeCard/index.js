import React from "react";
import styled from "styled-components";

import Tabs from "components/Tabs";
import TabsHeader from "components/TabsHeader";
import TabsItem from "components/TabsItem";
import TabsContent from "components/TabsContent";
import TabsPanel from "components/TabsPanel";
import TodayStats from "components/AverageDeliveryTimeCard/TodayStats";

function AverageDeliveryTimeCard(props){

  const MyTabsHeader = styled(TabsHeader)`
    border: none;
    justify-content: space-between;
  `

  return (
    <div className="Vlt-card">
      <div className="Vlt-card__content">
        <p><b>AVERAGE DELIVERY TIME</b></p>
        <Tabs>
          <MyTabsHeader>
            <TabsItem active={true}>Today</TabsItem>
            <TabsItem>This Week</TabsItem>
            <TabsItem>This Month</TabsItem>
          </MyTabsHeader>
          <TabsContent>
            <TabsPanel active={true}>
              <TodayStats/>
            </TabsPanel>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
export default AverageDeliveryTimeCard;