import React from "react";
import TextArea from "components/TextArea";

function TextTemplateInput({ onChange }){
  const [ body, setBody ] = React.useState("");

  React.useEffect(() => {
    if(onChange) onChange({ body });
  }, [ body ])

  return (
    <TextArea label="Body" value={body} setValue={setBody} />
  )
}
export default TextTemplateInput;