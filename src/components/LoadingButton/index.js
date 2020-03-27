import React from "react";

import Spinner from "components/Spinner";
import Button from "components/Button";

function LoadingButton({ loading, onClick, children, buttonType="button" }){
  return (
    <Button
      type="secondary"
      buttonType={buttonType}
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