import validator from "validator";
import { createContext, Dispatch, FormEvent, SetStateAction } from "react";

import useApiKey from "hooks/apiKey";
import useError from "hooks/error";
import { useContext, useEffect, useState } from "react";

interface FormContextProps {
  name: string;
  apiKey: string;
  apiSecret: string;
  setName: Dispatch<SetStateAction<string>>;
  setApiKey: Dispatch<SetStateAction<string>>;
  setApiSecret: Dispatch<SetStateAction<string>>;
  isSubmitting: boolean;
  isClean: boolean;
}

interface FormProps {
  children: any;
  onSubmitted: () => void;
}

const FormContext = createContext<FormContextProps>({} as FormContextProps);

function Form ({ children, onSubmitted }: FormProps) {
  const [name, setName] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [apiSecret, setApiSecret] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isClean, setIsClean] = useState<boolean>(false);
  const { create } = useApiKey();
  const { throwError } = useError();

  function cleanInput () {
    setName("");
    setApiKey("");
    setApiSecret("");
    setIsClean(false);
  }

  async function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await create({
        name,
        apiKey,
        apiSecret
      });
      cleanInput();
      if (onSubmitted) onSubmitted();
    } catch (err) {
      throwError(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(
    () => {
      setIsClean(
        !validator.isEmpty(name) &&
        !validator.isEmail(apiKey) &&
        !validator.isEmail(apiSecret)
      )
    },
    [name, apiKey, apiSecret]
  )

  return (
    <FormContext.Provider
      value={{
        name,
        apiKey,
        apiSecret,
        setName,
        setApiKey,
        setApiSecret,
        isSubmitting,
        isClean
      }}
    >
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

export function useForm () {
  return useContext(FormContext);
}

export default Form;