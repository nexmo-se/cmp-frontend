import TextTemplateInput from "./TextTemplateInput";
import ViberTemplateInput from "./ViberTemplateInput";
import WhatsappTemplateInput from "./WhatsappTemplateInput";

function TemplateInput () {

}

TemplateInput.Text = TextTemplateInput;
TemplateInput.Viber = ViberTemplateInput;
TemplateInput.Whatsapp = WhatsappTemplateInput;

export default TemplateInput;
