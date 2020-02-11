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

  return { data, list }
}
export default useApplication;