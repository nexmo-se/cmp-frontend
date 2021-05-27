import { useSingleTemplate } from "hooks/single-template";
import { useParams } from "react-router-dom";

import EditCard from "./components/EditCard";
import TemplateInformationCard from "components/TemplateInformationCard";
import FullPageSpinner from "components/FullPageSpinner";
import PageHeader from "components/PageHeader";

interface URLParameters {
  templateId: string;
}

function TemplateDetailPage () {
  const { templateId } = useParams<URLParameters>();
  const { template, isLoading } = useSingleTemplate({ id: templateId })

  if (isLoading || !template) return <FullPageSpinner />
  else {
    return (
      <>
        <PageHeader
          title="TEMPLATE"
          name={template.name}
        />
        <div className="Vlt-grid">
          <div className="Vlt-col Vlt-col--2of3">
            <EditCard template={template} />
          </div>
          <div className="Vlt-col">
            <TemplateInformationCard />
          </div>
        </div>
      </>
    );
  }
}
export default TemplateDetailPage;
