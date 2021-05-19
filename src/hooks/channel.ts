import Config from "config"
import FetchAPI from "api/fetch";
import lodash from "lodash";
import { UserContext } from "contexts/user";

import useSWR from "swr";
import { useContext, useEffect, useState } from "react";

import ApiKey from "entities/apiKey";
import Application from "entities/application";
import Channel from "entities/channel";

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
    const body =  JSON.stringify(JSON.parse(JSON.stringify({
      name: args.name,
      channel: args.channel,
      senderId: args.senderId,
      tps: parseInt(`${args.tps}`), // Just making sure the one that is inserted is number
      smsUseSignature: args.smsUseSignature,
      cmpApiKeyId: args.apiKey?.id,
      cmpApplicationId: args.application?.id
    })));
    
    await FetchAPI.post({ url, token, body });
    await mutate();
  }

  async function remove ({ id }: RemoveOptions) {
    if (!token) return;
    
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

}
export default useChannel;