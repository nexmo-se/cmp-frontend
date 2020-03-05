import React from "react";

import FetchAPI from "api/fetch";

import APIKey from "entities/apiKey";
import Channel from "entities/channel";
import Application from "entities/application";

function useApplication(token){
  const [ data, setData ] = React.useState([]);

  async function list(){
    const url = `${process.env.REACT_APP_BASE_API_URL}/applications`;
    const responseData = await FetchAPI.get(url, token);
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
    await FetchAPI.post(url, token, JSON.stringify(application.toJSON()));
  }

  async function remove(application){
    const url = `${process.env.REACT_APP_BASE_API_URL}/applications/${application.id}`;
    await FetchAPI.remove(url, token);
  }

  return { data, list, create, remove }
}
export default useApplication;