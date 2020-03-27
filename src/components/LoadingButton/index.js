import React from "react";

import Spinner from "components/Spinner";
import Button from "components/Button";

function LoadingButton({ loading, onClick, children }){
  return (
    <Button
      type="secondary"
      disabled={loading}
      onClick={onClick}
    >
      {loading?(
        <Spinner className="Vlt-spinner--smaller" white />
      ): null}
      {children}
    </Button>
  )
}
export default LoadingButton;