import React from "react";

import FetchAPI from "api/fetch";

import Template from "entities/template";
import useChannel from "hooks/channel";

function useTemplate(token){
  const [ data, setData ] = React.useState([]);
  const mChannel = useChannel(token);
  
  async function list(){
    const url = `${process.env.REACT_APP_BASE_API_URL}/templates`;
    const responseData = await FetchAPI.get(url, token);
    const newData = [];
    for(const data of responseData){
      let t = Template.fromJSON(data);
      t.channel = await mChannel.retrieve(t.channel);
      newData.push(t);
    }
    setData(newData);
  }

  async function create(template){
    const url = `${process.env.REACT_APP_BASE_API_URL}/templates`;
    await FetchAPI.post(url, token, JSON.stringify(template.toJSON()));
  }

  async function retrieve(template){
    const url = `${process.env.REACT_APP_BASE_API_URL}/templates/${template.id}`;
    const responseData = await FetchAPI.get(url, token);
    if(responseData) return Template.fromJSON(responseData);
    else return null;
  }

  return { data, list, create, retrieve } 
}
export default useTemplate;