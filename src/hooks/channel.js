import React from "react";

import FetchAPI from "api/fetch";
import Channel from "entities/channel";

function useChannel(token){
  const [ data, setData ] = React.useState([]);

  async function list(){
    const url = `${process.env.REACT_APP_BASE_API_URL}/channels`;
    const responseData = await FetchAPI.get(url, token);
    const newData = responseData.map((data) => {
      const channel = Channel.fromResponse(data);
      return channel;
    });
    setData(newData);
  }

  async function create(channel){
    const url = `${process.env.REACT_APP_BASE_API_URL}/channels`;
    await FetchAPI.post(url, token, JSON.stringify(channel.toRequest()));
  }

  async function retrieve(channel){
    const url = `${process.env.REACT_APP_BASE_API_URL}/channels/${channel.id}`;
    const responseData = await FetchAPI.get(url, token);
    if(responseData) return Channel.fromResponse(responseData);
    else return null;
  }

  async function remove(channel){
    const url = `${process.env.REACT_APP_BASE_API_URL}/channels/${channel.id}`;
    await FetchAPI.remove(url, token);
  }

  return { data, list, create, retrieve, remove };
}
export default useChannel;