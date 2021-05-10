import React from "react";
import { createContext } from "react";

import useUser from "hooks/user";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import NotAuthenticatedError from "entities/error/notAuthenticated";
import CriticalCallouts from "components/Callouts/Critical";
import SuccessCallouts from "components/Callouts/Success";

interface ErrorContextProps {
  throwError: () => void;
  clearError: () => void;
  throwSuccess: () => void;
}

interface ErrorProviderProps { 
  children: any;
}

export const ErrorContext = createContext<ErrorContextProps>({} as ErrorContextProps);

export default function ErrorProvider ({ children }: ErrorProviderProps) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const mHistory = useHistory();
  const mUser = useUser();

  function throwError (err) {
    console.log(err.stack);
    if (err instanceof NotAuthenticatedError) {
      mUser.logout()
      mHistory.push("/");
    }
    setError(err);
  }

  function clearError () {
    setError(null);
  }

  function throwSuccess (msg) {
    setSuccess(msg);
  }

  useEffect(
    () => {
      if (error) window.Volta.flash.show("critical", 5000);
    },
    [error]
  );

  useEffect(
    () => {
      if (success) window.Volta.flash.show("success", 5000);
    },
    [success]
  )

  return (
    <ErrorContext.Provider
      value={{
        throwError,
        clearError,
        throwSuccess
      }}
    >
      <CriticalCallouts id="critical">
        {error?.message}
      </CriticalCallouts>
      <SuccessCallouts id="success">
        {success?.message}
      </SuccessCallouts>

      {children}
    </ErrorContext.Provider>
  )
}