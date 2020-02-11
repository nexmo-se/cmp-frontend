import React from "react";

import CustomError from "entities/error";
import APIKey from "entities/apiKey";
import Channel from "entities/channel";
import Application from "entities/application";

function useApplication(token){
  const [ data, setData ] = React.useState([]);

  async function list(){
    const url = `${process.env.REACT_APP_BASE_API_URL}/applications`;
    const response = await fetch(url, { 
      method: "GET",
      headers: { 
        Authorization: `Bearer ${token}`
      }
    });

    if(response.status !== 200){
      throw new CustomError("applications/api-error", `Error calling the server: ${response.status}`);
    }

    const responseData = await response.json();
    const newData = responseData.map((data) => {
      const channels = data.cmpChannels.map((value) => Channel.fromJSON(value));
      const key = APIKey.fromJSON(data.cmpApiKey);
      const application = Application.fromJSON(data);
      application.cmpChannels = channels;
      application.apiKey = key;
      return application;
    });
    setData(newData);
  }

  async function create(application){
    const url = `${process.env.REACT_APP_BASE_API_URL}/applications`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(application.toJSON())
    });
    console.log(JSON.stringify(application.toJSON()));

    if(response.status !== 200){
      throw new CustomError("applications/api-error", `Error calling the server: ${response.status}`);
    }
  }

  return { data, list, create }
}
export default useApplication;