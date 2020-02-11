import React from "react";
import styled from "styled-components";
import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";

import GenerateCampaignTemplateModal from "components/GenerateCampaignTemplateModal";
import { Menu, MenuItem } from "@material-ui/core";

function RowMenu(){
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ modalVisible, setModalVisible ] = React.useState(false);

  const MyMenuItem = styled(MenuItem)`
    font-family: 'spezia', sans-serif !important;
    font-size: 1.4rem !important;
  `;
  
  const handleModalCancel = () => setModalVisible(false);
  const handleClick = ({ currentTarget }) => setAnchorEl(currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleGenerateMenuClick = () => setModalVisible(true);

  React.useEffect(() => {
    if(modalVisible) handleClose();
  }, [ modalVisible ])

  return (
    <React.Fragment>
      <svg className="Vlt-icon Vlt-icon--small" style={{ cursor: "pointer" }} onClick={handleClick}>
        <use xlinkHref={`${voltaIcons}#Vlt-icon-more-v-negative`}/>
      </svg>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
        <MyMenuItem onClick={handleGenerateMenuClick}>Generate Campaign Template</MyMenuItem>
        <MyMenuItem>View Detail</MyMenuItem>
      </Menu>

      <GenerateCampaignTemplateModal
        onCancelClick={handleModalCancel}
        toSelect="template" visible={modalVisible}/>
    </React.Fragment>
  )
}
export default RowMenu;