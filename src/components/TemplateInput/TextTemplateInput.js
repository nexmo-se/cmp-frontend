// @flow
import React from "react";
import TextArea from "components/TextArea";

type Content = { body:string }
type Props = {
  onChange:Function,
  content:Content
}

function TextTemplateInput({ onChange, content }:Props){
  function handleBodyChange(value){
    onChange({ ...content, body: value });
  }

  return (
    <TextArea label="Body" value={content.body} setValue={handleBodyChange} />
  )
}
export default TextTemplateInput;