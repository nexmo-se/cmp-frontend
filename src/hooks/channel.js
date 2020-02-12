import React from "react";

import CustomError from "entities/error";
import Application from "entities/application";
import APIKey from "entities/apiKey";
import Channel from "entities/channel";

function useChannel(token){
  const [ data, setData ] = React.useState([]);

  async function list(){
    const url = `${process.env.REACT_APP_BASE_API_URL}/channels`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(response.status !== 200) {
      throw new CustomError("channels/api-error", `Error with response: ${response.status}`)
    }

    const responseData = await response.json();
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
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(channel.toJSON())
    });

    console.log(JSON.stringify(channel.toJSON()));
    if(response.status !== 200){
      throw new CustomError("channels/api-error", `Error with response: ${response.status}`)
    }
  }

  return { data, list, create };
}
export default useChannel;