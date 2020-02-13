import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";
import React from "react";

function ButtonIcon({ onClick, icon, type="tertiary", style={} }){
  return (
    <button 
      className={`Vlt-btn Vlt-btn--${type} Vlt-btn--icon`}
      onClick={onClick}
      style={style}
    >
      <svg>
        <use xlinkHref={`${voltaIcons}#${icon}`} />
      </svg>
    </button>
  )
}
export default ButtonIcon;