// @flow
import React from "react";
import config from "config";
import FetchAPI from "api/fetch";
import APIKey from "entities/apiKey";

function useAPIKey(token:string){
  const [ data, setData ] = React.useState<Array<APIKey>>([]);

  async function list(){
    const url = `${config.apiDomain}/apikeys`;
    const responseData = await FetchAPI.get(url, token);
    const newData = responseData.map((data) => {
      const key = APIKey.fromResponse(data);
      return key;
    })
    setData(newData);
  }

  async function retrieve(apiKey:APIKey):Promise<APIKey>{
    if(!apiKey.id) throw new Error();
    const url = `${config.apiDomain}/apikeys/${apiKey.id}`;
    const responseData = await FetchAPI.get(url, token);
    if(responseData) return APIKey.fromResponse(responseData);
    else throw new Error("API Key not found");
  }

  async function create(apiKey:APIKey){
    const url = `${config.apiDomain}/apikeys`;
    await FetchAPI.post(url, token, JSON.stringify(apiKey.toRequest()));
  }

  async function update(apiKey:APIKey){
    if(!apiKey.id) throw new Error();
    const url = `${config.apiDomain}/apikeys/${apiKey.id}`;
    await FetchAPI.put(url, token, JSON.stringify(apiKey.toRequest()));
  }
  
  async function remove(apiKey:APIKey){
    if(!apiKey.id) throw new Error();
    const url = `${config.apiDomain}/apikeys/${apiKey.id}`;
    await FetchAPI.remove(url, token);
  }

  return { 
    data, 
    list, 
    create, 
    remove, 
    retrieve, 
    update 
  };
}
export default useAPIKey;