// @flow
import React from "react";
import TextArea from "components/TextArea";

interface Content {
  body:string
}

interface TextTemplateInputProps {
  onChange: (value: Content) => void;
  content: Content
}

function TextTemplateInput ({ onChange, content }: TextTemplateInputProps) {
  function handleBodyChange (value) {
    onChange({ body: value });
  }

  return (
    <TextArea
      label="Body"
      value={content.body}
      setValue={handleBodyChange}
    />
  )
}
export default TextTemplateInput;
