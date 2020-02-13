import React from "react";

import FetchAPI from "api/fetch";

function useCampaign(token){
  const [ data, setData ] = React.useState([]);

  async function list(){}

  async function create(campaign){
    const url = `${process.env.REACT_APP_BASE_API_URL}/campaigns`;
    await FetchAPI.post(url, token, JSON.stringify(campaign.toJSON()));
  }

  async function retrieve(){}

  return { data, list, create, retrieve };
}
export default useCampaign;