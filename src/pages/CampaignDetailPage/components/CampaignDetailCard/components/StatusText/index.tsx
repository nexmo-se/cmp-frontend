import clsx from "clsx";
import { titleCase } from "title-case";
import { useState, useEffect } from "react";

interface StatusTextProps {
  status: string;
  className?: string;
}

function StatusText ({ status, className }: StatusTextProps) {
  const [ color, setColor ] = useState("Vlt-black");

  useEffect(
    () => {
      if(status.toLowerCase() === "completed") setColor("Vlt-green");
      else if(status.toLowerCase() === "draft") setColor("Vlt-grey-darker");
      else if(status.toLowerCase() === "pending") setColor("Vlt-orange");
      else if(status.toLowerCase() === "paused") setColor("Vlt-yellow")
    },
    [status]
  );

  return (
    <p
      className={
        clsx(color, className)
      }
    >
      <b>{titleCase(status)}</b>
    </p>
  )
}
export default StatusText;