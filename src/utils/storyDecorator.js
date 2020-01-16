import React from "react";

import "@vonagevolta/test/dist/css/volta.css";

export default function decorator(storyFn){
  return (
    <React.Fragment>
      {storyFn()}
    </React.Fragment>
  )
}