import React from "react";
import storyDecorator from "utils/storyDecorator";

import CampaignTable from "components/CampaignTable";

export default {
  title: "components/CampaignTable",
  component: CampaignTable,
  decorator: [ storyDecorator ]
}

export const Default = () => {
  const data = [
    {
      id: "a161599c-7225-429e-81ee-f7bc3fb6773c",
      name: "Test Campaign",
      campaignStartDate: "2020-01-01T00:00:00.000Z",
      campaignEndDate: "2020-12-31T23:59:59.000Z",
      actualStartDate: null,
      actualEndDate: null, 
      actualDuration: null, 
      status: "draft", 
      statusTime: "2020-01-17T03:48:25.013Z",
      cmpCampaignStatusAudits: []
    }
  ]

  return <CampaignTable data={data}/>
}