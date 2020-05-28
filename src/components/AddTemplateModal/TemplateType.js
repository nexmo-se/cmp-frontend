// @flow
import React from "react";
import clsx from "clsx";
import { titleCase } from "title-case";

import Button from "components/Button";
import ButtonGroup from "components/Button/ButtonGroup";
import Channel from "entities/channel";

const channelMapping = {
  whatsapp: [ "audio", "file", "image", "location", {id: "whatsapp_text", text: "Text"}, "video" ],
  viber: [ "image", "text", {id: "viber_template", text: "Viber Template"} ],
  sms: [ {id: "none", text: "Text"} ]
}

const notSupportedType = [ "audio", "file", "image", "location", "video" ]

type Props = {
  channel:Channel,
  onChange:Function
}

function TemplateType({ channel, onChange }:Props){
  const [ selectedType, setSelectedType ] = React.useState();

  React.useEffect(() => {
    if(onChange) onChange(selectedType);
  }, [ selectedType ]);

  React.useEffect(() => {
    // set default selectedType when channel changes
    if(!channel) setSelectedType(null)
    else{
      switch(channel.channel){
        case "sms": return setSelectedType("none");
        case "whatsapp": return setSelectedType("whatsapp_text");
        case "viber": return setSelectedType("text")
        default: return setSelectedType(null);
      }
    }
  }, [ channel ])

  return (
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
  )
}
export default TemplateType;