import React from "react";

import Template from "entities/template";
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

function GenerateCSVModal({ 
  visible, 
  setVisible, 
  initCampaign,
  style={} 
}){
  const [ templateId, setTemplateId ] = React.useState(null);
  const [ isAdding, setIsAdding ] = React.useState(false);
  const { token } = React.useContext(UserContext);
  const { throwError } = React.useContext(ErrorContext);
  const mTemplate = useTemplate(token);

  async function handleGenerateDownload(e){
    try{
      e.preventDefault();
      setIsAdding(true);
      const template = Template.fromID(templateId);
      const foundTemplate = await mTemplate.retrieve(template);
      const parameters = foundTemplate.body.match(/{{\d+}}/g);
      const csvContent = CSVAPI.generateBlaster(parameters, 500000);
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `${initCampaign}#${templateId}.csv`);
      link.click();
    }catch(err){
      throwError(err);
    }finally{
      setIsAdding(false);
      setVisible(false);
    }
  }

  function handleCancel(){
    setVisible(false);
  }

  return (
    <Modal visible={visible} style={style} size="small">
      <form>
        <ModalHeader setVisible={setVisible}>
          <h4>Generate CSV</h4>
        </ModalHeader>
        <ModalContent>
          <CampaignDropdown 
            value={initCampaign} 
            label="Selected Campaign"
            disabled
          />
          <TemplateDropdown 
            value={templateId} 
            setValue={setTemplateId} 
            label="Select Template"
          />
        </ModalContent>
        <ModalFooter>
          <Button 
            type="tertiary" 
            onClick={handleCancel}
            disabled={isAdding}
          >
            Cancel
          </Button>
          <Button 
            buttonType="submit"
            type="secondary" 
            onClick={handleGenerateDownload}
            disabled={isAdding}
          >
            {isAdding?(
              <span className="Vlt-spinner Vlt-spinner--smaller Vlt-spinner--white" />
            ): null}
            Generate & Download
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
export default GenerateCSVModal