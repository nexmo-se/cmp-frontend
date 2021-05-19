import ApiKey from "entities/apiKey";
import validator from "validator";
import { createContext, Dispatch, FormEvent, SetStateAction, useContext } from "react";

import useError from "hooks/error";
import useApiKey from "hooks/apiKey";
import { useState, useEffect } from "react";

interface FormContextProps {
  name: string;
  apiKey: string;
  setName: Dispatch<SetStateAction<string>>;
  isSubmitting: boolean;
  isClean: boolean;
}

interface FormProps {
  children: any;
  defaultValue: ApiKey;
  onSubmitted: () => void;
}

const FormContext = createContext<FormContextProps>({} as FormContextProps);

function Form ({ onSubmitted, children, defaultValue }: FormProps) {
  const [name, setName] = useState<string>("");
  const [isClean, setIsClean] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const { throwError } = useError();
  const { update } = useApiKey();

  async function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isClean) return;
    if (!defaultValue.id) return;

    try {
      setIsSubmitting(true);
      await update(
        defaultValue.id,
        { name }
      )
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
        name !== defaultValue.name
      );
    },
    [name, defaultValue.name]
  )
  
  useEffect(
    () => {
      if (!defaultValue) return;
      if (!defaultValue.name) return;
      if (!defaultValue.apiKey) return;

      setName(defaultValue.name);
      setApiKey(defaultValue.apiKey);
    },
    [defaultValue]
  )

  return (
    <FormContext.Provider
      value={{
        name,
        apiKey,
        setName,
        isClean,
        isSubmitting
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