import voltaIcons from "@vonagevolta/volta2/dist/symbol/volta-icons.svg";
import React from "react";
import clsx from "clsx";

function VoltaIcon({ icon, className }){
  return (
    <svg className={clsx("Vlt-icon", className)}>
      <use xlinkHref={`${voltaIcons}#${icon}`} />
    </svg>
  )
}
export default VoltaIcon