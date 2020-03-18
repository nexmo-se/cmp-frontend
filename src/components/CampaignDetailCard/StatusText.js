import React from "react";
import clsx from "clsx";
import { titleCase } from "title-case";

function StatusText({ status, className }){
  const [ color, setColor ] = React.useState("Vlt-black");

  React.useEffect(() => {
    if(status.toLowerCase() === "completed") setColor("Vlt-green");
    else if(status.toLowerCase() === "draft") setColor("Vlt-grey-darker");
    else if(status.toLowerCase() === "pending") setColor("Vlt-orange");
    else if(status.toLowerCase() === "paused") setColor("Vlt-yellow")
  }, [ status ]);

  return (
    <p className={clsx(color, className)}>
      <b>{titleCase(status)}</b>
    </p>
  )
}
export default StatusText;