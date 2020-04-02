import React from "react";
import clsx from "clsx";
import { titleCase } from "title-case";

import FullPageSpinner from "components/FullPageSpinner";
import Button from "components/Button";
import ButtonGroup from "components/Button/ButtonGroup";

const channelMapping = {
  whatsapp: [ "audio", "file", "image", "location", { id: "whatsapp_text", text: "Text" }, "video" ],
  viber: [ "image", "text", { id: "viber_template", text: "Viber Template" } ],
  sms: [ "text" ]
}

const notSupportedType = [ "audio", "file", "image", "location", "video" ]

function TemplateType({ loading, channel, onChange }){
  const [ selectedType, setSelectedType ] = React.useState();

  React.useEffect(() => {
    if(onChange) onChange(selectedType);
  }, [ selectedType ]);

  React.useEffect(() => {
    if(!channel) setSelectedType(null)
    else if(channelMapping[channel]?.length === 1){
      const [ type ] = channelMapping[channel];
      setSelectedType(type);
    }else if(channelMapping[channel]?.length > 1 && channel !== "whatsapp"){
      setSelectedType("text");
    }else if(channelMapping[channel]?.length > 1 && channel === "whatsapp"){
      setSelectedType("whatsapp_text")
    }
  }, [ channel ])

  if(loading) return <FullPageSpinner />
  else if(!channel) return null;
  return (
    <div className="Vlt-form__element">
      <div className="Vlt-label">
        Template Type
      </div>
      <ButtonGroup>
        {channelMapping[channel]?.map((type) => {
          const typeData = (typeof(type) === "string")? { id: type, text: type }:
                           (typeof(type) === "object")? type: "";

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