// @flow

import React from "react";
import TextInput from "components/TextInput";
import TextArea from "components/TextArea";

type Content = {
  body:string,
  whatsappTemplateName:string,
  whatsappTemplateNamespace:string
}

type Props = { 
  onChange:Function,
  content:Content
}

function TextTemplateInput({ onChange, content }:Props){
  function handleNameChange(value){
    onChange({ ...content, whatsappTemplateName: value })
  }

  function handleNamespaceChange(value){
    onChange({ ...content, whatsappTemplateNamespace: value });
  }

  function handleBodyChange(value){
    onChange({ ...content, body: value });
  }

  return (
    <React.Fragment>
      <p>
        You can insert not-body parameters inside the <code>csv</code> file. To learn more, you can download <code>csv</code> template once the campaign and template is created.
      </p>
      <div className="Vlt-grid">
        <div className="Vlt-col">
          <TextInput 
            label="Whatsappp Template Name" 
            value={content.whatsappTemplateName}
            setValue={handleNameChange}
          />
        </div>
        <div className="Vlt-col">
          <TextInput 
            label="Whatsapp Template Namespace"
            value={content.whatsappTemplateNamespace}
            setValue={handleNamespaceChange}
          />
        </div>
      </div>
      <TextArea label="Body" value={content.body} setValue={handleBodyChange} />
    </React.Fragment>
  )
}
export default TextTemplateInput;