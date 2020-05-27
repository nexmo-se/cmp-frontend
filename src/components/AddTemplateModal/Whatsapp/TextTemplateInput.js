// @flow

import React from "react";
import TextInput from "components/TextInput";
import TextArea from "components/TextArea";

type Props = { onChange:Function }

function TextTemplateInput({ onChange }:Props){
  const [ body, setBody ] = React.useState<string>("");
  const [ name, setName ] = React.useState<string>("");
  const [ namespace, setNamespace ] = React.useState<string>("")

  React.useEffect(() => {
    if(onChange){
      onChange({
        whatsappTemplateName: name,
        whatsappTemplateNamespace: namespace,
        body 
      });
    }
  }, [ body, name ])

  return (
    <React.Fragment>
      <div className="Vlt-grid">
        <div className="Vlt-col">
          <TextInput 
            label="Whatsappp Template Name" 
            value={name}
            setValue={setName}
          />
        </div>
        <div className="Vlt-col">
          <TextInput 
            label="Whatsapp Template Namespace"
            value={namespace}
            setValue={setNamespace}
          />
        </div>
      </div>
      <TextArea label="Body" value={body} setValue={setBody} />
    </React.Fragment>
  )
}
export default TextTemplateInput;