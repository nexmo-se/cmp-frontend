import React from "react";

import CustomError from "entities/error";
import APIKey from "entities/apiKey";
import Application from "entities/application";
import Channel from "entities/channel";

function useAPIKey(token){
  const [ data, setData ] = React.useState([]);

  async function list(){
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
      const applications = data.cmpApplications.map((value) => Application.fromJSON(value));
      const channels = data.cmpChannels.map((value) => Channel.fromJSON(value));
      const key = APIKey.fromJSON(data);
      key.cmpApplications = applications;
      key.cmpChannels = channels;
      return key;
    })
    setData(newData);
  }

  return { data, list };
}
export default useAPIKey;