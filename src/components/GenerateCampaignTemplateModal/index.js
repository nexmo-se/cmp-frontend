import React from "react";
import TemplateAPI from "api/template";
import CampaignAPI from "api/campaign";

import Modal from "components/Modal";
import ModalHeader from "components/Modal/ModalHeader";
import ModalContent from "components/Modal/ModalContent";
import ModalFooter from "components/Modal/ModalFooter";
import Button from "components/Button";
import Dropdown from "components/Dropdown";

function GenerateCampaignTemplateModalComponent(props){
  const { visible, labelToSelect, options } = props;
  const [ selectedOption, setSelectedOption ] = React.useState(null);

  const handleCancelClick = () => props.onCancelClick();
  const handleGenerateDownloadClick = () => props.onGenerateDownloadClick(selectedOption);
  const handleOptionChange = (value) => setSelectedOption(value);

  React.useEffect(() => {
    setSelectedOption(null)
  }, [ options ])

  return (
    <Modal visible={visible}>
      <ModalHeader>
        <h4>Let me know your {labelToSelect}</h4>
      </ModalHeader>
      <ModalContent>
        <Dropdown label={`Please select below ${labelToSelect} to proceed`} value={selectedOption} onChange={handleOptionChange}>
          <option value={null}>-- Please select one --</option>
          {options.map((option) => <option value={option.id}>{option.name}</option>)}
        </Dropdown>
      </ModalContent>
      <ModalFooter>
        <Button type="tertiary" onClick={handleCancelClick}>Cancel</Button>
        <Button type="primary" onClick={handleGenerateDownloadClick}>Generate & Download</Button>
      </ModalFooter>
    </Modal>
  )
}

function GenerateCampaignTemplateModal(props){
  const { toSelect, visible } = props;
  const [ labelToSelect, setLabelToSelect ] = React.useState("");
  const [ options, setOptions ] = React.useState([]);

  const handleCancelClick = () => props.onCancelClick();
  const handleGenerateDownloadClick = (selectedOption) => props.onGenerateDownloadClick(selectedOption);

  const fetchOptions = async () => {
    const isDummy = process.env.REACT_APP_DUMMY_DATA;
    const options = await ((toSelect === "template")? TemplateAPI.listTemplate(isDummy): CampaignAPI.listCampaign(isDummy));
    setLabelToSelect(toSelect.toUpperCase());
    setOptions(options);
  }

  React.useEffect(() => {
    if(!toSelect) return;
    fetchOptions();
  }, [ toSelect ])

  return (
    <GenerateCampaignTemplateModalComponent 
      labelToSelect={labelToSelect} visible={visible} options={options}
      onCancelClick={handleCancelClick} onGenerateDownloadClick={handleGenerateDownloadClick}/>
  )
}

export default GenerateCampaignTemplateModal;