import React from "react";

import Campaign from "entities/campaign";
import FetchAPI from "api/fetch";

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

  return { data, list, create, retrieve, updateStatus, remove };
}
export default useCampaign;