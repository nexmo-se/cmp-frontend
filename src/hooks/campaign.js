import React from "react";

import Campaign from "entities/campaign";
import FetchAPI from "api/fetch";

function useCampaign(token){
  const [ data, setData ] = React.useState([]);

  async function list(){
    const url = `${process.env.REACT_APP_BASE_API_URL}/campaigns`;
    const responseData = await FetchAPI.get(url, token);
    const newData = responseData.map((data) => Campaign.fromJSON(data))
    console.log(newData);
    setData(newData);
  }

  async function create(campaign){
    const url = `${process.env.REACT_APP_BASE_API_URL}/campaigns`;
    await FetchAPI.post(url, token, JSON.stringify(campaign.toJSON()));
  }

  async function retrieve(){}

  return { data, list, create, retrieve };
}
export default useCampaign;