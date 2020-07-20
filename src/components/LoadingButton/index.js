// @flow
import React from "react";

import Spinner from "components/Spinner";
import Button from "components/Button";

type Props = {
  loading:boolean,
  disabled?:boolean,
  children?:any
}

function LoadingButton({ loading, children, disabled, ...props }:Props){
  return (
    <Button
      { ...props }
      type="secondary"
      disabled={loading || disabled}
    >
      {loading?(
        <Spinner className="Vlt-spinner--smaller" white />
      ): null}
      {children}
    </Button>
  )
}
export default LoadingButton;