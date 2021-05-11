import useApplication from "hooks/application";

import Empty from "components/Empty";
import FullPageSpinner from "components/FullPageSpinner";

import NormalTable from "./components/NormalTable";
import CompactTable from "./components/CompactTable";

interface ApplicationTableProps {
  compact: boolean;
}

function ApplicationTable ({ compact }: ApplicationTableProps) {
  const { applications, isLoading } = useApplication();
      
  if(isLoading || !applications) return <FullPageSpinner />
  else if(applications?.length <= 0) return <Empty />
  else if(compact) return <CompactTable applications={applications} />
  else if(!compact) return <NormalTable applications={applications} />
  else return null;
}
export default ApplicationTable;