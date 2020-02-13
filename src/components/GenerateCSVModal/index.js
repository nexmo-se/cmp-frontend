import React from "react";

import CSVAPI from "api/csv";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";
import CampaignDropdown from "components/CampaignDropdown";
import TemplateDropdown from "components/TemplateDropdown";
import Button from "components/Button";

function GenerateCSVModal({ visible, setVisible, style={}, initCampaign, initTemplate }){
  const [ campaign, setCampaign ] = React.useState(initCampaign);
  const [ template, setTemplate ] = React.useState(initTemplate);

  function handleGenerateDownload(){
    console.log(campaign, template);
    const csvContent = CSVAPI.generateBlaster();
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${campaign}#${template}.csv`);
    link.click();
  }

  return (
    <Modal visible={visible} style={style} size="small">
      <ModalHeader setVisible={setVisible}>
        <h4>Generate CSV</h4>
      </ModalHeader>
      <ModalContent>
          <CampaignDropdown 
            value={campaign} 
            setValue={setCampaign} 
            label="Select Campaign"
          />
          <TemplateDropdown 
            value={template} 
            setValue={setTemplate} 
            label="Select Template"
          />
      </ModalContent>
      <ModalFooter>
        <Button type="tertiary">Cancel</Button>
        <Button type="primary" onClick={handleGenerateDownload}>
          Generate & Download
        </Button>
      </ModalFooter>
    </Modal>
  )
}
export default GenerateCSVModal