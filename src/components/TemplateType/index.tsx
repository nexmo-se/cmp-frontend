import channelMapping from "./mappings.json";

import clsx from "clsx";
import lodash from "lodash";
import Channel from "entities/channel";
import { useState, useEffect } from "react";
import { TemplateContent } from "types/template";

import TemplateInput from "./components/TemplateInput";
import Button from "components/Button";
import ButtonGroup from "components/Button/ButtonGroup";

const notSupportedType = []

interface InputProps { 
  mediaType: string;
  content: TemplateContent;
  channel: Channel;
  onChange?: (value: any) => void;
};

interface TemplateTypeProps {
  channel: Channel,
  mediaType?: string,
  content: TemplateContent,
  onMediaTypeChange?: (value: string) => void;
  onContentChange?: (value: any) => void;
}

function Input ({ channel, mediaType, ...props }: InputProps) {
  if(!mediaType) return null;

  const textInput = ["none", "voice"];
  const viberInput = ["viber_template"];
  const whatsappInput = ["whatsapp"];
  
  if (channel.channel !== "whatsapp" && textInput.includes(mediaType)) {
    return <TemplateInput.Text {...props} />
  } else if (channel.channel === "viber" && viberInput.includes(mediaType)) {
    return <TemplateInput.Viber {...props} />
  } else if (channel.channel === "whatsapp") {
    return <TemplateInput.Whatsapp {...props} />
  } else return null;
}

function TemplateType( { mediaType, content, channel, onMediaTypeChange, onContentChange }: TemplateTypeProps) {
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(
    () => {
      if (onMediaTypeChange) onMediaTypeChange(selectedType);
    },
    [selectedType]
  );

  useEffect(
    () => {
      if (mediaType) setSelectedType(mediaType)
    },
    [mediaType]
  )

  useEffect(
    () => {
      // set default selectedType when channel changes
      if (!channel) setSelectedType("")
      else if (!mediaType) {
        switch (channel.channel) {
          case "sms": return setSelectedType("none");
          case "whatsapp": return setSelectedType("none");
          case "viber": return setSelectedType("none")
          case "voice": return setSelectedType("voice");
          default: return setSelectedType("");
        }
      }
    },
    [channel]
  )

  return (
    <>
      <div className="Vlt-form__element">
        <div className="Vlt-label">
          Template Type
        </div>
        <ButtonGroup>
          {channelMapping[channel.channel].map(
            (type) => {
              const typeData = {
                id: type.id ?? type,
                text: type.text ?? type
              }

              return (
                <Button 
                  key={typeData.id}
                  className={
                    clsx({
                      "Vlt-grey": true,
                      "Vlt-btn_active": selectedType === typeData.id,
                      "Vlt-grey-darker": selectedType === typeData.id
                    })
                  }
                  disabled={notSupportedType.includes(typeData.id)}
                  onClick={() => setSelectedType(typeData.id)}
                >
                  {lodash.startCase(typeData.text)}
                </Button>
              )
            }
          )}
        </ButtonGroup>
      </div>
      <Input 
        mediaType={selectedType} 
        content={content} 
        onChange={onContentChange}
        channel={channel}
      />
    </>
  )
}
export default TemplateType;