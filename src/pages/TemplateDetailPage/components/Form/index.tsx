import validator from "validator";
import { createContext, Dispatch, FormEvent, SetStateAction } from "react";
import { TemplateContent } from "types/template";

import SuccessMessage from "entities/success";
import Tempalte from "entities/template";
import Channel from "entities/channel";

import useError from "hooks/error";
import useTemplate from "hooks/template";
import { useSingleTemplate } from "hooks/single-template";
import { useState, useEffect, useContext } from "react";

interface FormContextProps {
  name: string;
  content: TemplateContent;
  channel?: Channel;
  mediaType: string;
  isSubmitting: boolean;
  isClean: boolean;
  setName: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<TemplateContent>>;
  setMediaType: Dispatch<SetStateAction<string>>;
}

interface FormProps {
  templateId: string;
  children: any;
  initialValue: Tempalte;
  onSubmitted?: () => void;
}

const FormContext = createContext<FormContextProps>({} as FormContextProps);

function Form ({ templateId, children, onSubmitted, initialValue }: FormProps) {
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<TemplateContent>({} as TemplateContent);
  const [channel, setChannel] = useState<Channel>();
  const [mediaType, setMediaType] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isClean, setIsClean] = useState<boolean>(false);
  const { throwError, throwSuccess } = useError();
  const { update } = useTemplate();
  const { mutate } = useSingleTemplate({ id: templateId });

  async function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isClean) return;
    try {
      setIsSubmitting(true);
      if (!content) return; // Just for the sake of not having ? type checking

      await update(templateId, {
        body: content.body,
        name: name,
        mediaType: mediaType
      });
      await mutate();

      const message = new SuccessMessage("Template has been edited");
      throwSuccess(message);

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
    [name, content, channel, mediaType]
  );
  
  useEffect(
    () => {
      if (!initialValue) return;

      setName(initialValue.name);
      setMediaType(initialValue.mediaType);
      setChannel(initialValue.channel);
      setContent({
        body: initialValue.body,
        whatsappTemplateName: initialValue.whatsappTemplateName,
        whatsappTemplateNamespace: initialValue.whatsappTemplateNamespace
      });
    },
    [initialValue]
  )

  return (
    <FormContext.Provider
      value={{
        name,
        content,
        channel,
        mediaType,
        isSubmitting,
        isClean,
        setName,
        setContent,
        setMediaType
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