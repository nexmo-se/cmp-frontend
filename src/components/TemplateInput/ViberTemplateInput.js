// @flow
import React from "react";
import TextArea from "components/TextArea";

type Content = { body:string }
type Props = {
  onChange:Function,
  content:Content
}

function ViberTemplateInput({ onChange, content }:Props){
  function handleBodyChange(value){
    onChange({ ...content, body: value });
  }

  return (
    <React.Fragment>
      <p>Viber Template consists of <code>text, image, caption and actionUrl</code> parameters. In this template, you just need to specify <code>text</code>, and the rest of the parameters you can specify it inside CSV.</p>
      <TextArea label="Body" value={content.body} setValue={handleBodyChange} />
    </React.Fragment>
  )
}
export default ViberTemplateInput;