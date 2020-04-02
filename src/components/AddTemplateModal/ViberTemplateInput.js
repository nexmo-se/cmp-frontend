import React from "react";
import TextArea from "components/TextArea";

function ViberTemplateInput({ onChange }){
  const [ body, setBody ] = React.useState("");

  React.useEffect(() => {
    if(onChange) onChange({ body });
  }, [ body ])

  return (
    <React.Fragment>
      <p>Viber Template consists of <code>text, image, caption and actionUrl</code> parameters. In this template, you just need to specify <code>text</code>, and the rest of the parameters you can specify it inside CSV.</p>
      <TextArea label="Body" value={body} setValue={setBody} />
    </React.Fragment>
  )
}
export default ViberTemplateInput;