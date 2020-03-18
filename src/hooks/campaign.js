import React from "react";

import FetchAPI from "api/fetch";
import Campaign from "entities/campaign";
import Report from "entities/report";

function useCampaign(token){
  const [ data, setData ] = React.useState([]);

  async function list(){
    const url = `${process.env.REACT_APP_BASE_API_URL}/campaigns`;
    const responseData = await FetchAPI.get(url, token);
    const newData = responseData.map((data) => Campaign.fromJSON(data))
    setData(newData);
  }

  async function create(campaign){
    const url = `${process.env.REACT_APP_BASE_API_URL}/campaigns`;
    await FetchAPI.post(url, token, JSON.stringify(campaign.toJSON()));
  }

  async function retrieve(campaign){
    const url = `${process.env.REACT_APP_BASE_API_URL}/campaigns/${campaign.id}`;
    const responseData = await FetchAPI.get(url, token);
    if(responseData) return Campaign.fromJSON(responseData);
    else return null;
  }

  async function updateStatus(campaign, status){
    const url = `${process.env.REACT_APP_BASE_API_URL}/campaigns/${campaign.id}/status`
    const body = { status }
    await FetchAPI.put(url, token, JSON.stringify(body));
  }

  async function remove(campaign){
    const url = `${process.env.REACT_APP_BASE_API_URL}/campaigns/${campaign.id}`;
    await FetchAPI.remove(url, token);
  }

  async function summaryReport(campaign){
    const url = `${process.env.REACT_APP_BASE_API_URL}/reports/json`;
    const payload = {
      type: "campaign_summary",
      content: {
        cmpCampaignId: campaign.id
      }
    };
    const responseData = await FetchAPI.post(url, token, JSON.stringify(payload));
    if(responseData) return Report.fromJSON(responseData);
    else return null;
  }

  return {
    data, 
    list, 
    create, 
    retrieve, 
    updateStatus, 
    remove ,
    summaryReport
  };
}
export default useCampaign;