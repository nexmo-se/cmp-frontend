import Config from "config";
import lodash from "lodash";
import FetchAPI from "api/fetch";

import ApiKey from "entities/apiKey";
import Application from "entities/application";

import useSWR from "swr";
import useUser from "./user";
import { useState, useEffect } from "react";

interface CreateOptions {
  name: string;
  privateKey: string;
  applicationId: string;
  apiKey: ApiKey;
}

interface RemoveOptions {
  id: string;
}

function useApplication () {
  const [applications, setApplications] = useState<Application[]>();
  const { token } = useUser();
  const { data, error, mutate } = useSWR([`${Config.apiDomain}/applications`, token]);

  async function create ({ name, applicationId, apiKey, privateKey }: CreateOptions) {
    const url = `${Config.apiDomain}/applications`;
    const body = JSON.stringify({
      name,
      applicationId,
      privateKey,
      cmpApiKeyId: apiKey.id
    });
    await FetchAPI.post({ url, token, body });
    await mutate();
  }

  async function remove ({ id }: RemoveOptions) {
    if (!token) return;

    const url = `${Config.apiDomain}/applications/${id}`;
    await FetchAPI.remove(url, token);
    await mutate();
  }

  useEffect(
    () => {
      if (!data) return;

      const applications = lodash.map(data, Application.fromResponse)
      setApplications(applications);
    },
    [data]
  );

  return {
    create,
    remove,
    applications,
    isLoading: !data && !error
  }
}
export default useApplication;