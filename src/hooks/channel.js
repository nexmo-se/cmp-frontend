// @flow
import React from "react";
import Config from "config"

import FetchAPI from "api/fetch";
import Channel from "entities/channel";

function useChannel(token){
  const [ data, setData ] = React.useState([]);

  async function list () {
    const url = `${Config.apiDomain}/channels`;
    const responseData = await FetchAPI.get(url, token);
    const newData = responseData.map((data) => {
      const channel = Channel.fromResponse(data);
      return channel;
    });
    setData(newData);
  }

  async function create (channel: Channel) {
    const url = `${Config.apiDomain}/channels`;
    await FetchAPI.post(url, token, JSON.stringify(channel.toRequest()));
  }

  async function retrieve (channel: Channel) {
    if (!channel.id) return undefined;

    const url = `${Config.apiDomain}/channels/${channel.id}`;
    const responseData = await FetchAPI.get(url, token);
    if(responseData) return Channel.fromResponse(responseData);
    else return undefined;
  }

  async function remove (channel: Channel) {
    if (!channel.id) return undefined;
    
    const url = `${Config.apiDomain}/channels/${channel.id}`;
    await FetchAPI.remove(url, token);
  }

  return {
    data,
    list,
    create,
    retrieve,
    remove
  };
}
export default useChannel;