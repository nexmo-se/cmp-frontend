// @flow
import React from "react";
import TextArea from "components/TextArea";

interface Content {
  body:string
}

interface ViberTemplateInputProps {
  onChange: (value: Content) => void;
  content: Content
}

function ViberTemplateInput ({ onChange, content }: ViberTemplateInputProps) {
  function handleBodyChange(value){
    onChange({ body: value });
  }

  return (
    <React.Fragment>
      <p>
        Viber Template consists of <code>text, image, caption and actionUrl</code> parameters.&nbsp;
        In this template, you just need to specify <code>text</code>,&nbsp;
        and the rest of the parameters you can specify it inside CSV.
      </p>

      <TextArea
        label="Body"
        value={content.body ?? ""}
        setValue={handleBodyChange}
      />
    </React.Fragment>
  )
}
export default ViberTemplateInput;