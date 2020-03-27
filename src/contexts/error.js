import React from "react";

import CriticalCallouts from "components/Callouts/Critical";
import SuccessCallouts from "components/Callouts/Success";

export const ErrorContext = React.createContext({ throwError: () => {} });
export default function ErrorProvider({ children }){
  const [ error, setError ] = React.useState(null);
  const [ success, setSuccess ] = React.useState(null);

  function throwError(err){
    console.log(err.stack);
    setError(err);
  }

  function clearError(){
    setError(null);
  }

  function throwSuccess(msg){
    setSuccess(msg);
  }

  React.useEffect(() => {
    if(error) window.Volta.flash.show("critical", 5000);
  }, [ error ]);

  React.useEffect(() => {
    if(success) window.Volta.flash.show("success", 5000);
  }, [ success ])

  return (
    <ErrorContext.Provider value={{ throwError, clearError, throwSuccess }}>
      <CriticalCallouts id="critical">
        {error?.message}
      </CriticalCallouts>
      <SuccessCallouts id="success">
        {success}
      </SuccessCallouts>

      {children}
    </ErrorContext.Provider>
  )
}