import React from "react";

import CustomError from "entities/error";
import APIKey from "entities/apiKey";
import Application from "entities/application";
import Channel from "entities/channel";

function useAPIKey(token, refreshToken){
  const [ data, setData ] = React.useState([]);

  async function fetchData(){
    const url = `${process.env.REACT_APP_BASE_API_URL}/apikeys`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if(response.status !== 200) {
      throw new CustomError("apikeys/api-error", `Error with response: ${response.status}`)
    }
    
    const responseData = await response.json();
    const newData = responseData.map((data) => {
      const applications = data.cmpApplications.map((value) => {
        const app = new Application();
        app.id = value.id;
        app.name = value.name;
        app.applicationId = value.applicationId;
        return app;
      })

      const channels = data.cmpChannels.map((value) => {
        const ch = new Channel();
        ch.id = value.id;
        ch.name = value.name;
        ch.channel = value.channel;
        ch.senderId = value.senderId;
        ch.tps = value.tps;
        return ch;
      })

      const key = new APIKey();
      key.id = data.id;
      key.name = data.name;
      key.apiKey = data.apiKey;
      key.cmpApplications = applications;
      key.cmpChannels = channels;
      return key;
    })
    setData(newData);
  }

  React.useEffect(() => {
    fetchData();
  }, [ refreshToken ]);

  return data;
}
export default useAPIKey;