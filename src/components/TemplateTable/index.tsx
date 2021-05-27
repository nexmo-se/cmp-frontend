import useTemplate from "hooks/template";

import Empty from "components/Empty";
import FullPageSpinner from "components/FullPageSpinner";
import NormalTable from "./components/NormalTable";

function TemplateTable () {
  const { templates, isLoading } = useTemplate();

  if (isLoading || !templates) return <FullPageSpinner />
  else if(templates.length <= 0) return <Empty />;
  else return <NormalTable templates={templates} />
}
export default TemplateTable;