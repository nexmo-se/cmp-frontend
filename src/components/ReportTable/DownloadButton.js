import React from "react";
import ButtonIcon from "components/ButtonIcon";

function DownloadButton({ report, disabled }){
  function handleClick(){
    console.log(report);
    const link = document.createElement("a");
    link.setAttribute("href", report.downloadURL);
    link.setAttribute("download", true);
    link.setAttribute("target", "_blank");
    link.click();
  }

  return (
    <ButtonIcon 
      icon="Vlt-icon-download" 
      disabled={disabled}
      onClick={handleClick}
    />
  )
}
export default DownloadButton;