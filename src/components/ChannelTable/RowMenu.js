import React from "react";
import styled from "styled-components";
import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";

import { Menu, MenuItem } from "@material-ui/core";

function RowMenu(){
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  const MyMenuItem = styled(MenuItem)`
    font-family: 'spezia', sans-serif !important;
    font-size: 1.4rem !important;
  `;

  const handleClick = ({ currentTarget }) => setAnchorEl(currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <React.Fragment>
      <svg className="Vlt-icon Vlt-icon--small" style={{ cursor: "pointer" }} onClick={handleClick}>
        <use xlinkHref={`${voltaIcons}#Vlt-icon-more-v-negative`}/>
      </svg>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
        <MyMenuItem>View Detail</MyMenuItem>
      </Menu>
    </React.Fragment>
  )
}
export default RowMenu;