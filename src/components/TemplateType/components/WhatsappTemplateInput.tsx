import TextInput from "components/TextInput";
import TextArea from "components/TextArea";
import { TemplateContent } from "types/template";

interface WhatsappTemplateInputProps {
  onChange: (value: TemplateContent) => void;
  content: TemplateContent;
}

function WhatsappTemplateInput ({ onChange, content }: WhatsappTemplateInputProps) {
  function handleNameChange (value: string) {
    onChange({ ...content, whatsappTemplateName: value })
  }

  function handleNamespaceChange (value: string) {
    onChange({ ...content, whatsappTemplateNamespace: value });
  }

  function handleBodyChange (value: string) {
    onChange({ ...content, body: value });
  }

  return (
    <>
      <p>
        You can insert not-body parameters inside the <code>csv</code> file.&nbsp;
        To learn more, you can download <code>csv</code> &nbsp;
        template once the campaign and template is created.
      </p>
      <div className="Vlt-grid">
        <div className="Vlt-col">
          <TextInput 
            label="Whatsappp Template Name" 
            value={content.whatsappTemplateName ?? ""}
            setValue={handleNameChange}
          />
        </div>
        <div className="Vlt-col">
          <TextInput 
            label="Whatsapp Template Namespace"
            value={content.whatsappTemplateNamespace ?? ""}
            setValue={handleNamespaceChange}
          />
        </div>
      </div>
      <TextArea
        label="Body"
        value={content.body ?? ""}
        setValue={handleBodyChange}
      />
    </>
  )
}

export default WhatsappTemplateInput;
