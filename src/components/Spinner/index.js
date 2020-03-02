import React from "react";

function Spinner({ white=true }){
  return (
    <div class={`Vlt-spinner ${white? "Vlt-spinner--white": ""}`} />
  )
}
export default Spinner