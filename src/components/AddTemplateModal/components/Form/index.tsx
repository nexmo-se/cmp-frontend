import Channel from "entities/channel";
import validator from "validator";
import { createContext, Dispatch, FormEvent, SetStateAction } from "react";
import { TemplateContent } from "types/template";

import useError from "hooks/error";
import useTemplate from "hooks/template";
import { useState, useContext, useEffect } from "react";

interface FormContextProps {
  name: string;
  channel?: Channel;
  mediaType: string;
  content: TemplateContent;
  setName: Dispatch<SetStateAction<string>>;
  setChannel: Dispatch<SetStateAction<Channel | undefined>>;
  setMediaType: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<TemplateContent>>;
  isSubmitting: boolean;
  isClean: boolean;
}

interface FormProps {
  children: any;
  onSubmitted?: () => void
}

const FormContext = createContext<FormContextProps>({} as FormContextProps);

function Form ({ children, onSubmitted }: FormProps) {
  const [name, setName] = useState<string>("");
  const [channel, setChannel] = useState<Channel>();
  const [mediaType, setMediaType] = useState<string>("");
  const [content, setContent] = useState<TemplateContent>({
    body: "",
    whatsappTemplateName: "",
    whatsappTemplateNamespace: ""
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isClean, setIsClean] = useState<boolean>(false);
  const { throwError } = useError();
  const { create } = useTemplate();

  async function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isClean) return;

    try {
      setIsSubmitting(true);
      if (!content) return; // just to remove ? from typechecking
      if (!channel) return; // just to remove ? from typechecking

      await create({
        name,
        mediaType,
        body: content.body,
        whatsappTemplateName: content.whatsappTemplateName,
        whatsappTemplateNamespace: content.whatsappTemplateNamespace,
        channel
      });
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
        !validator.isEmpty(mediaType) &&
        content !== undefined &&
        channel !== undefined
      )
    },
    [name, channel, mediaType, content]
  )

  return (
    <FormContext.Provider
      value={{
        name,
        channel,
        mediaType,
        content,
        setName,
        setChannel,
        setMediaType,
        setContent,
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
