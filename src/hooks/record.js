import React from "react";

import FetchAPI from "api/fetch";

import Campaign from "entities/campaign";
import Template from "entities/template";
import Record from "entities/record";

function useRecord(token){
  const [ data, setData ] = React.useState([]);

  async function uploadCSV(file){
    const [ filename ] = file.name.match(/([a-z|0-9|-])+#([a-z|0-9|-])+/g);
    const [ campaignId, templateId ] = filename.split("#");
    const campaign = Campaign.fromID(campaignId);
    const template = Template.fromID(templateId);
    const url = `${process.env.REACT_APP_BASE_API_URL}/records/csv/${campaign.id}/${template.id}`;
    const formData = new FormData();
    formData.append("file", file);
    await FetchAPI.postFile(url, token, formData);
    return { campaign, template }
  }

  return { data, uploadCSV }
}
export default useRecord;