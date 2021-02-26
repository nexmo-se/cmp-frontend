// @flow
import React from "react";

import Template from "entities/template";
import Campaign from "entities/campaign";

import CSVAPI from "api/csv";
import useTemplate from "hooks/template"
import { UserContext } from "contexts/user";
import { ErrorContext } from "contexts/error";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";
import CampaignDropdown from "components/CampaignDropdown";
import TemplateDropdown from "components/TemplateDropdown";
import Button from "components/Button";
import LoadingButton from "components/LoadingButton";

type Props = {
  visible:boolean,
  setVisible:Function,
  campaign:Campaign,
  refreshToken?:string,
  disableCampaign?:boolean,
  disableTemplate?:boolean
}

function GenerateCSVModal({ 
  visible, 
  setVisible, 
  campaign:initialCampaign, 
  refreshToken,
  disableCampaign,
  disableTemplate
}:Props){
  const [ selectedTemplate, setSelectedTemplate ] = React.useState<Template|void>()
  const [ selectedCampaign, setSelectedCampaign ] = React.useState<Campaign>(initialCampaign)
  const [ isGenerating, setIsGenerating ] = React.useState<boolean>(false);
  const [ isClean, setIsClean ] = React.useState<boolean>(true);
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mTemplate = useTemplate(token);

  function handleCancel(){
    setVisible(false);
  }

  async function handleGenerateDownload(e){
    try{
      e.preventDefault();
      if(!isClean) throw new Error("You need to complete the form");
      if(!selectedTemplate) throw new Error("Please select one template");
      setIsGenerating(true);
      const foundTemplate = await mTemplate.retrieve(selectedTemplate);
      const csvContent = CSVAPI.generateBlaster(foundTemplate);
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      
      if(!selectedTemplate?.id) throw new Error("You need to complete the form ");
      link.setAttribute("download", `${selectedCampaign.id}#${selectedTemplate.id}.csv`)
      link.click();
    }catch(err){
      throwError(err);
    }finally{
      setIsGenerating(false);
      setVisible(false);
    }
  }

  React.useEffect(() => {
    setSelectedCampaign(initialCampaign);
  }, [ initialCampaign ])

  React.useEffect(() => {
    if(selectedCampaign && selectedTemplate) setIsClean(true);
    else setIsClean(false);
  }, [ selectedCampaign, selectedTemplate ])

  return (
    <Modal visible={visible} size="small">
      <form>
        <ModalHeader setVisible={setVisible}>
          <h4>Generate CSV</h4>
        </ModalHeader>
        <ModalContent>
          <CampaignDropdown 
            value={selectedCampaign} 
            onChange={setSelectedCampaign}
            label="Selected Campaign"
            refreshToken={refreshToken}
            disabled={disableCampaign}
          />
          <TemplateDropdown 
            value={selectedTemplate} 
            onChange={setSelectedTemplate} 
            label="Select Template"
            refreshToken={refreshToken}
            disabled={disableTemplate}
          />
        </ModalContent>
        <ModalFooter>
          <Button 
            type="tertiary" 
            onClick={handleCancel}
            disabled={isGenerating || !isClean}
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={handleGenerateDownload}
            disabled={!isClean}
            loading={isGenerating}
          >
            Generate &amp; Download
          </LoadingButton>
        </ModalFooter>
      </form>
    </Modal>
  )
}
export default GenerateCSVModal