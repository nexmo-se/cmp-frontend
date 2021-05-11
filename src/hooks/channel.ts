import Config from "config"
import FetchAPI from "api/fetch";
import lodash from "lodash";
import { UserContext } from "contexts/user";

import useSWR, { mutate } from "swr";
import { useContext, useEffect, useState } from "react";

import ApiKey from "entities/apiKey";
import Application from "entities/application";
import Channel from "entities/channel";
import { NotImplementedError } from "entities/error";

interface CreateOptions {
  name: string;
  channel: string;
  smsUseSignature: boolean;
  senderId: string;
  tps: number;
  apiKey?: ApiKey;
  application?: Application;
}

interface RemoveOptions {
  id: string;
}

function useChannel () {
  const [channels, setChannels] = useState<Channel[]>([]);
  const { token } = useContext(UserContext);
  const { data, error, mutate } = useSWR([`${Config.apiDomain}/channels`, token]);

  async function create (args: CreateOptions) {
    const url = `${Config.apiDomain}/channels`;
    const payload =  JSON.parse(JSON.stringify({
      id: args.id,
      name: args.name,
      channel: args.channel,
      senderId: args.senderId,
      tps: parseInt(args.tps),
      smsUseSignature: args.smsUseSignature,
      cmpApiKeyId: args.apiKey?.id,
      cmpApplicationId: args.application?.id
    }))
    
    await FetchAPI.post(url, token, JSON.stringify(payload));
    await mutate();
  }

  async function remove ({ id }: RemoveOptions) {
    const url = `${Config.apiDomain}/channels/${id}`;
    await FetchAPI.remove(url, token);
    await mutate();
  }

  useEffect(
    () => {
      if (!data) return;
      const channels = lodash(data).map(Channel.fromResponse).value();
      setChannels(channels);
    },
    [data]
  )

  return {
    create,
    remove,
    channels,
    isLoading: !data && !error
  }

  // const [ data, setData ] = React.useState([]);

  // const list = React.useCallback(
  //   async () => {
  //     const url = `${Config.apiDomain}/channels`;
  //     const responseData = await FetchAPI.get(url, token);
  //     const newData = responseData.map((data) => {
  //       const channel = Channel.fromResponse(data);
  //       return channel;
  //     });
  //     setData(newData);
  //   },
  //   [token]
  // )

  // async function create (channel: Channel) {
  //   const url = `${Config.apiDomain}/channels`;
  //   await FetchAPI.post(url, token, JSON.stringify(channel.toRequest()));
  // }

  // async function retrieve (channel: Channel) {
  //   if (!channel.id) return undefined;

  //   const url = `${Config.apiDomain}/channels/${channel.id}`;
  //   const responseData = await FetchAPI.get(url, token);
  //   if(responseData) return Channel.fromResponse(responseData);
  //   else return undefined;
  // }

  // async function remove (channel: Channel) {
  //   if (!channel.id) return undefined;
    
  //   const url = `${Config.apiDomain}/channels/${channel.id}`;
  //   await FetchAPI.remove(url, token);
  // }

  // return {
  //   data,
  //   list,
  //   create,
  //   retrieve,
  //   remove
  // };
}
export default useChannel;