// @flow
import fetch from "node-fetch";
import config from "config";

import Campaign from "entities/campaign";
import Template from "entities/template";
import Record from "entities/record";

function useRecord(token:string){
  async function createMetadata(campaign:Campaign, template:Template){
    if(!template.body) throw new Error("Your developer need to fix something. `template.body undefined`");

    const payload = {
      mediaType: template.mediaType,
      column: [
        "recipient",
        ...template.additionalColumns,
        ...template.parameterColumns
      ]
    }
    
    if(!campaign.id) throw new Error();
    if(!template.id) throw new Error();
    const url = `${config.apiDomain}/records/csv/${campaign.id}/${template.id}/metadata`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    if(response.ok) return true;
    else throw new Error(response.statusText);
  }

  async function uploadCSV(campaign:Campaign, template:Template, file:File){
    if(!template.id) throw new Error("Your developer need to fix something. `template.id undefined`");
    const url = `${config.apiDomain}/records/csv/${campaign.id}/${template.id}`;
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    if(response.ok) return true;
    else throw new Error(response.statusText);
  }

  return { createMetadata, uploadCSV }
}
export default useRecord;