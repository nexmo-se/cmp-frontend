import CSVAPI from "api/csv";
import { Dispatch, SetStateAction } from "react";

import Template from "entities/template";
import Campaign from "entities/campaign";

import useError from "hooks/error";
import { useSingleTemplate } from "hooks/single-template";
import { useState, useEffect } from "react";

import Modal from "components/Modal";
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
  const { template: foundTemplate } = useSingleTemplate({ id: selectedTemplate?.id ?? undefined })
  const { throwError } = useError();

  function handleCancel () {
    setVisible(false);
  }

  async function handleGenerateDownload () {
    try {
      if (!isClean) throw new Error("You need to complete the form");
      if (!foundTemplate) return;

      setIsGenerating(true);
      const csvContent = CSVAPI.generateBlaster(foundTemplate);
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", `${selectedCampaign.id}#${foundTemplate.id}.csv`)
      link.click();
    } catch (err: unknown) {
      throwError(err as Error);
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
        foundTemplate !== undefined
      )
    },
    [selectedCampaign, foundTemplate]
  )

  return (
    <Modal
      visible={visible}
      size="small"
    >
      <Modal.Header setVisible={setVisible}>
        <h4>Generate CSV</h4>
      </Modal.Header>
      <Modal.Content>
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
      </Modal.Content>
      <Modal.Footer>
        <Button 
          type="tertiary" 
          onClick={handleCancel}
          disabled={isGenerating}
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
      </Modal.Footer>
    </Modal>
  )
}

export default GenerateCSVModal
