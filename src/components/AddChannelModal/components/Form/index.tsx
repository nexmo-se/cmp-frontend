import ChannelService from "services/channel";
import validator from "validator";
import { createContext, SetStateAction, Dispatch, FormEvent } from "react";

import useChannel from "hooks/channel";
import useError from "hooks/error";
import { useContext, useState, useEffect } from "react";

import ApiKey from "entities/apiKey";
import Application from "entities/application";
import { NotImplementedError } from "entities/error";

interface FormContextProps {
  name: string;
  channel: string;
  senderId: string;
  tps: number;
  apiKey?: ApiKey;
  application?: Application;
  isClean: boolean;
  isAdding: boolean;
  setName: Dispatch<SetStateAction<string>>;
  setChannel: Dispatch<SetStateAction<string>>;
  setSenderId: Dispatch<SetStateAction<string>>;
  setTps: Dispatch<SetStateAction<number>>;
  setApikey: Dispatch<SetStateAction<ApiKey>>;
  setApplication: Dispatch<SetStateAction<Application>>;
}

interface FormProviderProps {
  children: any;
  onSubmitted: () => void;
  onError: () => void;
}

const FormContext = createContext<FormContextProps>({} as FormContextProps);

function FormProvider ({ onSubmitted, onError, children }: FormProviderProps) {
  const [name, setName] = useState<string>("");
  const [channel, setChannel] = useState<string>("");
  const [senderId, setSenderId] = useState<string>("");
  const [tps, setTps] = useState<number>(15);
  const [apiKey, setApiKey] = useState<ApiKey>();
  const [application, setApplication] = useState<Application>();
  const [isClean, setIsClean] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { create: createChannel } = useChannel();
  const { throwError } = useError();

  function clearInput () {
    setName("");
    setChannel("");
    setSenderId("");
    setTps(15);
    setApiKey(undefined);
    setApplication(undefined);
  }

  async function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsAdding(true);
    try {
      await createChannel({
        name,
        channel,
        smsUseSignature: false,
        senderId,
        tps,
        apiKey,
        application 
      })
      clearInput();
      if (onSubmitted) onSubmitted();
    } catch (err) {
      throwError(err);
    } finally {
      setIsAdding(false);
    }
  }

  useEffect(
    () => {
      const isBasicValid = (
        !validator.isEmpty(name) && 
        !validator.isEmpty(channel) &&
        !validator.isEmpty(`${tps}`)
      );
      if (!isBasicValid) {
        setIsClean(false);
        return;
      }

      switch (channel) {
        case "sms": 
          setIsClean(
            !validator.isEmpty(senderId) &&
            apiKey !== undefined
          );
          break;
        case "viber":
        case "whatsapp":
        case "voice":
          setIsClean(
            !validator.isEmpty(senderId) &&
            apiKey !== undefined &&
            application !== undefined
          )
          break;
        case "number_insight":
          setIsClean(apiKey !== undefined);
          break;
        default:
          setIsClean(false);
      }
    },
    [name, channel, senderId, tps, apiKey, application]
  )

  return (
    <FormContext.Provider
      value={{
        name,
        channel,
        senderId,
        tps,
        apiKey,
        application,
        isClean,
        isAdding,
        setName,
        setChannel,
        setSenderId,
        setTps,
        setApiKey,
        setApplication
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

export default FormProvider;