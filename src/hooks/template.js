// @flow
import React from "react";
import FetchAPI from "api/fetch";
import config from "config";

import Template from "entities/template";
import useChannel from "hooks/channel";

function useTemplate(token:string){
  const [ data, setData ] = React.useState([]);
  const mChannel = useChannel(token);
  
  async function list(){
    const url = `${config.apiDomain}/templates`;
    const responseData = await FetchAPI.get(url, token);
    const newData = responseData.map((data) => Template.fromResponse(data));
    setData(newData);
  }

  async function create(template:Template){
    const url = `${config.apiDomain}/templates`;
    await FetchAPI.post(url, token, JSON.stringify(template.toRequest()));
  }

  async function retrieve(template:Template):Promise<Template>{
    if(!template.id) throw new Error();
    const url = `${config.apiDomain}/templates/${template.id}`;
    const responseData = await FetchAPI.get(url, token);
    if(responseData) return Template.fromResponse(responseData);
    else throw new Error("Template not found");
  }

  async function update(template:Template){
    if(!template.id) throw new Error();
    const url = `${config.apiDomain}/templates/${template.id}`;
    await FetchAPI.put(url, token, JSON.stringify(template.toUpdateRequest()));
  }

  async function remove(template:Template){
    if(!template.id) throw new Error();
    const url = `${config.apiDomain}/templates/${template.id}`;
    await FetchAPI.remove(url, token);
  }

  return { 
    data, 
    list, 
    create, 
    retrieve, 
    remove, 
    update 
  } 
}
export default useTemplate;