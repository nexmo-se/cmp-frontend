import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";
import React from "react";

function RefreshButton({ onClick, buttonType="button" }){
  return (
    <button 
      type={buttonType}
      className={`Vlt-btn Vlt-btn--tertiary Vlt-btn--app`}
      onClick={onClick}
    >
      <svg>
        <use xlinkHref={`${voltaIcons}#Vlt-icon-refresh`} />
      </svg>
      Refresh
    </button>
  )
}
export default RefreshButton;