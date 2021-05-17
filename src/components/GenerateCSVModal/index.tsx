import CSVAPI from "api/csv";
import { Dispatch, SetStateAction } from "react";

import Template from "entities/template";
import Campaign from "entities/campaign";

import useTemplate from "hooks/template";
import useError from "hooks/error";
import { useSingleTemplate } from "hooks/single-template";
import { useState, useEffect } from "react";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";
import CampaignDropdown from "components/CampaignDropdown";
import TemplateDropdown from "components/TemplateDropdown";
import Button from "components/Button";
import LoadingButton from "components/LoadingButton";

interface GenerateCSVModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  campaign: Campaign;
}

function GenerateCSVModal ({ visible, setVisible, campaign }: GenerateCSVModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign>(campaign);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isClean, setIsClean] = useState<boolean>(true);
  const { throwError } = useError();
  const { retrieve } = useSingleTemplate({ id: selectedTemplate?.id ?? undefined })

  function handleCancel () {
    setVisible(false);
  }

  async function handleGenerateDownload () {
    try {
      if (!isClean) throw new Error("You need to complete the form");
      if (!selectedTemplate) throw new Error("Please select one template");

      setIsGenerating(true);
      const foundTemplate = await retrieve(selectedTemplate);
      const csvContent = CSVAPI.generateBlaster(foundTemplate);
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      
      if (!selectedTemplate?.id) throw new Error("You need to complete the form ");
      link.setAttribute("download", `${selectedCampaign.id}#${selectedTemplate.id}.csv`)
      link.click();
    } catch (err) {
      throwError(err);
    } finally {
      setIsGenerating(false);
      setVisible(false);
    }
  }

  useEffect(
    () => {
      setSelectedCampaign(campaign);
    },
    [campaign]
  )

  useEffect(
    () => {
      setIsClean(
        selectedCampaign !== undefined &&
        selectedTemplate !== undefined
      )
    },
    [selectedCampaign, selectedTemplate]
  )

  return (
    <Modal
      visible={visible}
      size="small"
    >
      <ModalHeader setVisible={setVisible}>
        <h4>Generate CSV</h4>
      </ModalHeader>
      <ModalContent>
        <CampaignDropdown 
          value={selectedCampaign} 
          onChange={setSelectedCampaign}
          label="Selected Campaign"
          disabled
        />
        <TemplateDropdown 
          value={selectedTemplate} 
          onChange={setSelectedTemplate} 
          label="Select Template"
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
    </Modal>
  )
}

export default GenerateCSVModal
