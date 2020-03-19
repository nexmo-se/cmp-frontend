import React from "react";

import FetchAPI from "api/fetch";
import APIKey from "entities/apiKey";

function useAPIKey(token){
  const [ data, setData ] = React.useState([]);

  async function list(){
    const url = `${process.env.REACT_APP_BASE_API_URL}/apikeys`;
    const responseData = await FetchAPI.get(url, token);
    const newData = responseData.map((data) => {
      // const applications = data.cmpApplications.map((value) => Application.fromJSON(value));
      // const channels = data.cmpChannels.map((value) => Channel.fromJSON(value));
      const key = APIKey.fromJSON(data);
      // key.cmpApplications = applications;
      // key.cmpChannels = channels;
      return key;
    })
    setData(newData);
  }

  async function retrieve(apiKey){
    const url = `${process.env.REACT_APP_BASE_API_URL}/apikeys/${apiKey.id}`;
    const responseData = await FetchAPI.get(url, token);
    if(responseData) return APIKey.fromJSON(responseData);
    else return null;
  }

  async function create(apiKey){
    const url = `${process.env.REACT_APP_BASE_API_URL}/apikeys`;
    await FetchAPI.post(url, token, JSON.stringify(apiKey.toJSON()));
  }
  
  async function remove(apiKey){
    const url = `${process.env.REACT_APP_BASE_API_URL}/apikeys/${apiKey.id}`;
    await FetchAPI.remove(url, token);
  }

  return { data, list, create, remove, retrieve };
}
export default useAPIKey;