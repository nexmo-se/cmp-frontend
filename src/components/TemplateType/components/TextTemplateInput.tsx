import TextArea from "components/TextArea";
import { TemplateContent } from "types/template";

interface TextTemplateInputProps {
  onChange: (value: TemplateContent) => void;
  content: TemplateContent
}

function TextTemplateInput ({ onChange, content }: TextTemplateInputProps) {
  function handleBodyChange (value: string) {
    onChange({ body: value });
  }

  return (
    <TextArea
      label="Body"
      value={content.body ?? ""}
      setValue={handleBodyChange}
    />
  )
}
export default TextTemplateInput;
