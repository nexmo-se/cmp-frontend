import React from "react";

import "@vonagevolta/test/dist/css/volta.css";

export default function decorator(storyFn){
  return (
    <div>
      {storyFn()}
    </div>
  )
}