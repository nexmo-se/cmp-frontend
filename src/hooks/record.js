// @flow
import React from "react";

import FetchAPI from "api/fetch";

import Campaign from "entities/campaign";
import Template from "entities/template";
import Record from "entities/record";

function useRecord(token:string){
  async function uploadCSV(campaign:Campaign, template:Template, file:File){
    // uploading metadata to server
    if(!template.mediaType) throw new Error();

    // const payload = {
    //   mediaType: template.mediaType,
    //   column: [
    //     "recipient",
    //     ...template.additionalColumns,
    //     ...template.parameterColumns
    //   ]
    // }

    // const [ filename ] = file.name.match(/([a-z|0-9|-])+#([a-z|0-9|-])+/g);
    // const [ campaignId, templateId ] = filename.split("#");
    // const campaign = Campaign.fromID(campaignId);
    // const template = Template.fromID(templateId);
    // const url = `${process.env.REACT_APP_BASE_API_URL}/records/csv/${campaign.id}/${template.id}`;
    // const formData = new FormData();
    // formData.append("file", file);
    // await FetchAPI.postFile(url, token, formData);
    // return { campaign, template }
  }

  return { uploadCSV }
}
export default useRecord;