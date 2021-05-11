import Config from "config";
import lodash from "lodash";
import FetchAPI from "api/fetch";
import Application from "entities/application";

import useSWR from "swr";
import useUser from "./user";
import { useState, useEffect } from "react";

interface CreateOptions {
  name: string;
  privateKey: string;
  applicationId: string;
  privateKey: string;
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
    const payload = {
      name,
      applicationId,
      privateKey,
      cmpApiKeyId: apiKey.id
    };
    await FetchAPI.post(url, token, JSON.stringify(payload));
    await mutate();
  }

  async function remove ({ id }: RemoveOptions) {
    const url = `${Config.apiDomain}/applications/${id}`;
    await FetchAPI.remove(url, token);
    await mutate();
  }

  useEffect(
    () => {
      if (!data) return;

      const applications = lodash(data).map(Application.fromResponse).value();
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
  // const [ data, setData ] = React.useState([]);

  // const list = React.useCallback(
  //   async () => {
  //     const url = `${Config.apiDomain}/applications`;
  //     const responseData = await FetchAPI.get(url, token);
  //     const newData = responseData.map(
  //       (data) => {
  //         const application = Application.fromResponse(data);
  //         return application;
  //       }
  //     );
  //     setData(newData);
  //   },
  //   [token]
  // )

  // async function create(application){
  //   const url = `${Config.apiDomain}/applications`;
  //   await FetchAPI.post(url, token, JSON.stringify(application.toJSON()));
  // }

  // async function remove(application){
  //   const url = `${Config.apiDomain}/applications/${application.id}`;
  //   await FetchAPI.remove(url, token);
  // }

  // return { data, list, create, remove }
}
export default useApplication;