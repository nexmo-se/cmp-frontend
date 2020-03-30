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
    const newData = responseData.map((data) => Template.fromJSON(data));
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

  async function update(template){
    const url = `${process.env.REACT_APP_BASE_API_URL}/templates/${template.id}`;
    await FetchAPI.put(url, token, JSON.stringify(template.toUpdateJSON()));
  }

  async function remove(template){
    const url = `${process.env.REACT_APP_BASE_API_URL}/templates/${template.id}`;
    await FetchAPI.remove(url, token);
  }

  return { data, list, create, retrieve, remove, update } 
}
export default useTemplate;