import TextArea from "components/TextArea";
import { TemplateContent } from "types/template";

interface ViberTemplateInputProps {
  onChange: (value: TemplateContent) => void;
  content: TemplateContent
}

function ViberTemplateInput ({ onChange, content }: ViberTemplateInputProps) {
  function handleBodyChange (value: string) {
    onChange({ body: value });
  }

  return (
    <>
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
    </>
  )
}
export default ViberTemplateInput;