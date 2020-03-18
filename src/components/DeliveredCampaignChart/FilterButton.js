import React from "react";
import Button from "components/Button";

function FilterButton({ active, onClick, children }){
  return (
    <Button
      type={active? "secondary": ""}
      buttonStyle="rounded"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
export default FilterButton;