import React from "react";

import FetchAPI from "api/fetch";

import Application from "entities/application";
import APIKey from "entities/apiKey";
import Channel from "entities/channel";

function useChannel(token){
  const [ data, setData ] = React.useState([]);

  async function list(){
    const url = `${process.env.REACT_APP_BASE_API_URL}/channels`;
    const responseData = await FetchAPI.get(url, token);
    const newData = responseData.map((data) => {
      const application = (data.cmpApplication)? Application.fromJSON(data.cmpApplication): new Application();
      const apiKey = (data.cmpApiKey)? APIKey.fromJSON(data.cmpApiKey): new APIKey();
      const channel = Channel.fromJSON(data);
      channel.application = application;
      channel.apiKey = apiKey;
      return channel;
    });
    setData(newData);
  }

  async function create(channel){
    const url = `${process.env.REACT_APP_BASE_API_URL}/channels`;
    await FetchAPI.post(url, token, JSON.stringify(channel.toJSON()));
  }

  async function retrieve(channel){
    const url = `${process.env.REACT_APP_BASE_API_URL}/channels/${channel.id}`;
    const responseData = await FetchAPI.get(url, token);
    if(responseData) return Channel.fromJSON(responseData);
    else return null;
  }

  return { data, list, create, retrieve };
}
export default useChannel;