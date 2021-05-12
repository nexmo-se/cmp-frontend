import Form from "../Form";
import FormContent from "../FormContent";

interface EditProps {
  template: Template;
}

function EditCard ({ template }: EditProps) {
  console.log(template);
  return (
    <div className="Vlt-card Vlt-card--border">
      <Form
        templateId={template.id}
        initialValue={template}
      >
        <div className="Vlt-card__header">
          <h4>Edit Template</h4>
        </div>
        <div className="Vlt-card__content">
          <FormContent />
        </div>
      </Form>
    </div>
  )
}
export default EditCard;