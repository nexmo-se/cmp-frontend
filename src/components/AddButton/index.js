import React from "react";
import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";

import Button from "components/Button";

function AddButton(props){
  const { children } = props;
  
  return (
    <Button type="primary">
      <svg><use xlinkHref={`${voltaIcons}#Vlt-icon-plus`}/></svg>
      {children}
    </Button>
  )
}
export default AddButton;