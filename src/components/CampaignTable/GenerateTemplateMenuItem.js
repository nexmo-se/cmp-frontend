import React from "react";
import styled from "styled-components";

import { MenuItem } from "@material-ui/core";
import GenerateCampaignTemplateModal from "components/GenerateCampaignTemplateModal";

function GenerateTemplateMenuItem(props){
  const [ modalVisible, setModalVisible ] = React.useState(false);

  const MyMenuItem = styled(MenuItem)`
    font-family: 'spezia', sans-serif !important;
    font-size: 1.4rem !important;
  `;

  const handleCancelClick = () => setModalVisible(false);
  const handleClick = () => setModalVisible((prevVisible) => !prevVisible);
  
  return (
    <React.Fragment>
      <MyMenuItem onClick={handleClick}>Generate Campaign Template</MyMenuItem>
      <GenerateCampaignTemplateModal
        onCancelClick={handleCancelClick}
        toSelect="template" visible={modalVisible}/>
    </React.Fragment>
  )
}
export default GenerateTemplateMenuItem;