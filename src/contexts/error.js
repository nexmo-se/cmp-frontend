import React from "react";

export const ErrorContext = React.createContext();
export default function ErrorProvider({ children }){
  const [ error, setError ] = React.useState(null);

  function throwError(err){
    setError(err);
  }

  function clearError(err){
    setError(null);
  }

  return (
    <ErrorContext.Provider value={{ throwError, clearError }}>
      {error?(
        <div className="Vlt-callout Vlt-callout--critical">
          <i></i>
          <div className="Vlt-callout__content">
            <p>{error.message}</p>
          </div>
        </div>
      ): null}
      {children}
    </ErrorContext.Provider>
  )
}