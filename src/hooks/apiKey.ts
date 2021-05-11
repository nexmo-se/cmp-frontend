import Config from "config";
import FetchAPI from "api/fetch";
import ApiKey from "entities/apiKey";
import lodash from "lodash";

import useSWR from "swr";
import useUser from "./user";
import { useEffect, useState } from "react";

interface CreateOptions {
  name: string;
  apiKey: string;
  apiSecret: string;
}

interface UpdateValueOptions {
  name: string;
}

function useApiKey () {
  const [apiKeys, setApiKeys] = useState<ApiKey>([]);
  const { token } = useUser();
  const { data, error, mutate } = useSWR([`${Config.apiDomain}/apiKeys`, token]);

  async function create ({ name, apiKey, apiSecret }: CreateOptions) {
    const url = `${Config.apiDomain}/apikeys`;
    const payload = { name, apiKey, apiSecret }
    await FetchAPI.post(url, token, JSON.stringify(payload));
    await mutate();
  }

  async function update (id: string, updateValue: UpdateValueOptions) {
    // I don't care if the id exists in database, backend will do the checking
    if (!id) return;

    const url = `${Config.apiDomain}/apikeys/${id}`;
    await FetchAPI.put(url, token, JSON.stringify(updateValue));
    await mutate();
  }

  async function remove (id: string) {
    if (!id) return;

    const url = `${Config.apiDomain}/apikeys/${id}`;
    await FetchAPI.remove(url, token);
    await mutate();
  }

  useEffect(
    () => {
      if (!data) return;
      const apiKeys = lodash(data).map(ApiKey.fromResponse).value();
      setApiKeys(apiKeys);
    },
    [data]
  )

  return {
    apiKeys,
    create,
    update,
    remove,
    isLoading: !data && !error
  }
}

export default useApiKey;
