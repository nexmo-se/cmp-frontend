import React from "react";

import FetchAPI from "api/fetch";
import Application from "entities/application";

function useApplication(token){
  const [ data, setData ] = React.useState([]);

  async function list(){
    const url = `${process.env.REACT_APP_BASE_API_URL}/applications`;
    const responseData = await FetchAPI.get(url, token);
    const newData = responseData.map((data) => {
      const application = Application.fromJSON(data);
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