import React from "react";
import { useHistory } from "react-router-dom";

import ButtonIcon from "components/ButtonIcon";

function DetailButton({ template }){
  const mHistory = useHistory();

  function handleClick(){
    mHistory.push(`/templates/${template.id}`);
  }

  return (
    <ButtonIcon icon="Vlt-icon-gear" onClick={handleClick} />
  )
}
export default DetailButton;