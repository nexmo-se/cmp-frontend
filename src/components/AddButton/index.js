import React from "react";
import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";

import Button from "components/Button";

function AddButton({ children, onClick, disabled, isAdding }){
  return (
    <Button type="secondary" onClick={onClick} disabled={disabled}>
      {isAdding?(
        <span className="Vlt-spinner Vlt-spinner--smaller Vlt-spinner--white" />
      ):(
        <svg>
          <use xlinkHref={`${voltaIcons}#Vlt-icon-plus`} />
        </svg>
      )}
      {children}
    </Button>
  )
}
export default AddButton;