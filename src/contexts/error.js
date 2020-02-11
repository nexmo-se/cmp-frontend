import React from "react";

import CriticalCallouts from "components/Callouts/Critical";

export const ErrorContext = React.createContext({ throwError: () => {} });
export default function ErrorProvider({ children }){
  const [ error, setError ] = React.useState(null);

  function throwError(err){
    setError(err);
  }

  function clearError(){
    setError(null);
  }

  React.useEffect(() => {
    if(error) window.Volta.flash.show("critical", 5000);
  }, [ error ])

  return (
    <ErrorContext.Provider value={{ throwError, clearError }}>
      <CriticalCallouts id="critical">
        {error? error.message: ""}
      </CriticalCallouts>
      {children}
    </ErrorContext.Provider>
  )
}