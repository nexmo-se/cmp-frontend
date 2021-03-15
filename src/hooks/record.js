// @flow
import config from "config";

import Campaign from "entities/campaign";
import Template from "entities/template";
import Record from "entities/record";
import FetchAPI from "api/fetch";

function useRecord (token: string) {

  /**
   * Create Metadata to be sent to the server
   * Override the mediaType based on the template.mediaType
   */
  async function createMetadata (campaign: Campaign, template: Template) {
    const payload = {
      mediaType: (template.mediaType === "whatsapp_text" || template.mediaType === "voice")? "none": template.mediaType,
      columns: [
        "recipient",
        ...template.additionalColumns,
        ...template.parameterColumns
      ]
    }
    
    if(!campaign.id) throw new Error();
    if(!template.id) throw new Error();
    const url = `${config.apiDomain}/records/csv/${campaign.id}/${template.id}/metadata`
    await FetchAPI.post(url, token, JSON.stringify(payload));
  }

  async function uploadCSV (campaign: Campaign, template: Template, file:File) {
    if (!template.id) throw new Error("Your developer need to fix something. `template.id undefined`");
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
    if (response.ok) return true;
    else throw new Error(response.statusText);
  }

  return { createMetadata, uploadCSV }
}
export default useRecord;