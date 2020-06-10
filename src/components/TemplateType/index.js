// @flow
import React from "react";
import clsx from "clsx";
import Channel from "entities/channel";
import { titleCase } from "title-case";

import TextTemplateInput from "components/TemplateInput/TextTemplateInput";
import ViberTemplateInput from "components/TemplateInput/ViberTemplateInput";
import WhatsappTemplateInput from "components/TemplateInput/WhatsappTemplateInput";

import Button from "components/Button";
import ButtonGroup from "components/Button/ButtonGroup";

const channelMapping = {
  whatsapp: [ 
    "audio", 
    "file",
    "image", 
    "location",
    { id: "none", text: "Text" },
    "video" 
  ],
  viber: [ 
    "image", 
    { id: "none", text: "Text" }, 
    { id: "viber_template", text: "Viber Template" } 
  ],
  sms: [{ id: "none", text: "Text" }]
}

const notSupportedType = [ "audio", "image", "video" ]

type Content = {
  body:string,
  whatsappTemplateName:string,
  whatsappTemplateNamespace:string
}

type InputProps = { 
  mediaType?:string,
  content:Content,
  channel:Channel,
  onChange?:Function
};

type Props = {
  channel:Channel,
  mediaType?:string,
  content:Content,
  onMediaTypeChange?:Function,
  onContentChange?:Function
}

function Input({ channel, mediaType, ...props }:InputProps){
  if(!mediaType) return null;
  if(mediaType === "none") return <TextTemplateInput {...props }/>
  else if(channel.channel === "viber" && mediaType === "viber_template") return <ViberTemplateInput {...props} />
  else if(channel.channel === "whatsapp") return <WhatsappTemplateInput {...props} />
  else return null;
}

function TemplateType({ mediaType, content, channel, onMediaTypeChange, onContentChange }:Props){
  const [ selectedType, setSelectedType ] = React.useState<string>("");

  React.useEffect(() => {
    if(onMediaTypeChange) onMediaTypeChange(selectedType);
  }, [ selectedType ]);

  React.useEffect(() => {
    if(mediaType) setSelectedType(mediaType)
  }, [ mediaType ])

  React.useEffect(() => {
    // set default selectedType when channel changes
    if(!channel) setSelectedType("")
    else if(!mediaType){
      switch(channel.channel){
        case "sms": return setSelectedType("none");
        case "whatsapp": return setSelectedType("none");
        case "viber": return setSelectedType("none")
        default: return setSelectedType("");
      }
    }
  }, [ channel ])

  return (
    <React.Fragment>
      <div className="Vlt-form__element">
        <div className="Vlt-label">
          Template Type
        </div>
        <ButtonGroup>
          {channelMapping[channel.channel].map((type) => {
            const typeData = (typeof(type) === "string")? { id: type, text: type }:
                            (typeof(type) === "object")? type: { id: "", text: "" }

            return (
              <Button 
                key={typeData.id}
                className={clsx(
                  "Vlt-grey",
                  (selectedType === typeData.id)? "Vlt-btn_active": "",
                  (selectedType === typeData.id)? "Vlt-grey-darker": ""
                )}
                disabled={notSupportedType.includes(typeData.id)}
                onClick={() => setSelectedType(typeData.id)}
              >
                {titleCase(typeData.text)}
              </Button>
            )
          })}
        </ButtonGroup>
      </div>
      <Input 
        mediaType={selectedType} 
        content={content} 
        onChange={onContentChange}
        channel={channel}
      />
    </React.Fragment>
  )
}
export default TemplateType;