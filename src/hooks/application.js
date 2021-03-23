import React from "react";
import Config from "config";

import FetchAPI from "api/fetch";
import Application from "entities/application";

function useApplication(token){
  const [ data, setData ] = React.useState([]);

  const list = React.useCallback(
    async () => {
      const url = `${Config.apiDomain}/applications`;
      const responseData = await FetchAPI.get(url, token);
      const newData = responseData.map(
        (data) => {
          const application = Application.fromResponse(data);
          return application;
        }
      );
      setData(newData);
    },
    [token]
  )

  async function create(application){
    const url = `${Config.apiDomain}/applications`;
    await FetchAPI.post(url, token, JSON.stringify(application.toJSON()));
  }

  async function remove(application){
    const url = `${Config.apiDomain}/applications/${application.id}`;
    await FetchAPI.remove(url, token);
  }

  return { data, list, create, remove }
}
export default useApplication;