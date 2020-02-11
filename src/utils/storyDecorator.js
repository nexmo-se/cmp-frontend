import "@vonagevolta/volta2/dist/css/volta.css";

import React from "react";

export default function decorator(storyFn){
  return (
    <React.Fragment>
      {storyFn()}
    </React.Fragment>
  )
}