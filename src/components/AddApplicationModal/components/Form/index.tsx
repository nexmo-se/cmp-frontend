import ApiKey from "entities/apiKey";
import validator from "validator";
import { createContext, Dispatch, FormEvent, SetStateAction } from "react";

import useError from "hooks/error";
import useApplication from "hooks/application";
import { useState, useEffect, useContext } from "react";

interface FormContextProps {
  name: string;
  applicationId: string;
  privateKey?: File;
  apiKey?: ApiKey;
  isSubmitting: boolean;
  isClean: boolean;
  setName: Dispatch<SetStateAction<string>>;
  setApplicationId: Dispatch<SetStateAction<string>>;
  setPrivateKey: (privateKey?: File) => void;
  setApiKey: (apiKey: ApiKey) => void;
}

interface FormProps {
  children: any;
  onSubmitted?: () => void;
}

const FormContext = createContext<FormContextProps>({} as FormContextProps);

function Form ({ children, onSubmitted }: FormProps) {
  const [name, setName] = useState<string>("");
  const [applicationId, setApplicationId] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<File>();
  const [apiKey, setApiKey] = useState<ApiKey>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isClean, setIsClean] = useState<boolean>(false);
  const { throwError } = useError();
  const { create } = useApplication();

  function cleanInput () {
    setName("");
    setApplicationId("");
    setPrivateKey(undefined);
    setApiKey(undefined);
  }

  function extractPrivateKey (): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        if (!privateKey) return reject(new Error("Private key is not defined"));
        const reader = new FileReader();
        reader.readAsText(privateKey, "utf-8");
        reader.onload = (e) => {
          if (!reader.result) return reject(new Error());
          else return resolve(reader.result);
        }
        reader.onerror = (e) => reject(e);
      }
    )
  }

  async function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isClean) return;
    if (!apiKey) return;
    
    try {
      setIsSubmitting(true);
      const privateKeyContent = await extractPrivateKey();
      const privateKey = btoa(privateKeyContent);
      await create({
        name,
        applicationId,
        apiKey,
        privateKey
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
        !validator.isEmpty(applicationId) &&
        privateKey !== undefined &&
        apiKey !== undefined
      )
    },
    [name, applicationId, privateKey, apiKey]
  )
  
  return (
    <FormContext.Provider
      value={{
        name,
        applicationId,
        privateKey,
        apiKey,
        isSubmitting,
        isClean,
        setName,
        setApplicationId,
        setPrivateKey,
        setApiKey
      }}
    >
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

export function useForm () {
  return useContext(FormContext)
}

export default Form;
