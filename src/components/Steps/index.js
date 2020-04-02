import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

function Steps({ children, to, done, selected }){
  return (
    <Link className={clsx(
      "Vlt-steps__item",
      (done)? "Vlt-steps__item_done": "",
      (selected)? "Vlt-steps__item_selected": ""
    )} to={to}>
      <span>{children}</span>
    </Link>
  )
}
export default Steps;