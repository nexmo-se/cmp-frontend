import useApplication from "hooks/application";

import Empty from "components/Empty";
import FullPageSpinner from "components/FullPageSpinner";
import NormalTable from "./components/NormalTable";

function ApplicationTable () {
  const { applications, isLoading } = useApplication();
      
  if (isLoading || !applications) return <FullPageSpinner />
  else if (applications?.length <= 0) return <Empty />
  else return <NormalTable applications={applications} />
}
export default ApplicationTable;