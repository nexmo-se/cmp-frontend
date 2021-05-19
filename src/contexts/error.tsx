import { createContext } from "react";

import NotAuthenticatedError from "entities/error/not-authenticated";
import SuccessMessage from "entities/success";

import useUser from "hooks/user";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import CriticalCallouts from "components/Callouts/Critical";
import SuccessCallouts from "components/Callouts/Success";

interface ErrorContextProps {
  throwError: (err: Error) => void;
  clearError: () => void;
  throwSuccess: (message: SuccessMessage) => void;
}

interface ErrorProviderProps { 
  children: any;
}

export const ErrorContext = createContext<ErrorContextProps>({} as ErrorContextProps);

export default function ErrorProvider ({ children }: ErrorProviderProps) {
  const [error, setError] = useState<Error>();
  const [success, setSuccess] = useState<SuccessMessage>();
  const { push } = useHistory();
  const { logout } = useUser();

  function throwError (err: Error) {
    console.log(err.stack);
    if (err instanceof NotAuthenticatedError) {
      logout()
      push("/");
    }
    setError(err);
  }

  function clearError () {
    setError(undefined);
  }

  function throwSuccess (msg: SuccessMessage) {
    setSuccess(msg);
  }

  useEffect(
    () => {
      if (error) (window as any).Volta.flash.show("critical", 5000);
    },
    [error]
  );

  useEffect(
    () => {
      if (success) (window as any).Volta.flash.show("success", 5000);
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