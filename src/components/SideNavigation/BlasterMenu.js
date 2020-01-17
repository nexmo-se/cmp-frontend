import React from "react";

import NestedMenu from "components/SideNavigation/NestedMenu";
import SingleMenu from "components/SideNavigation/SingleMenu";

function BlasterMenu(props){
  return (
    <NestedMenu icon="Vlt-icon-rocket" label="Blaster">
      <SingleMenu icon="Vlt-icon-download" label="Download Template"/>
      <SingleMenu icon="Vlt-icon-upload" label="Upload Template"/>
    </NestedMenu>
  )
}
export default BlasterMenu;