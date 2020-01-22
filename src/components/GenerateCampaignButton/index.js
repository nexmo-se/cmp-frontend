import React from "react";

import Button from "components/Button";
import GenerateCampaignTemplateModal from "components/GenerateCampaignTemplateModal";

function GenerateCampaignButton(props){
  const { toSelect } = props;
  const [ modalVisible, setModalVisible ] = React.useState(false);

  const handleGenerateClick = () => setModalVisible(true);
  const handleModalCancel = () => setModalVisible(false);

  return (
    <React.Fragment>
      <Button type="tertiary" onClick={handleGenerateClick}>Generate Campign Template</Button>
      <GenerateCampaignTemplateModal 
        visible={modalVisible} toSelect={toSelect}
        onCancelClick={handleModalCancel}/>
    </React.Fragment>
  )
}
export default GenerateCampaignButton;