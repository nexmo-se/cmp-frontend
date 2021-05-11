import useApiKey from "hooks/apiKey";

import NormalTable from "./components/NormalTable";
import FullPageSpinner from "components/FullPageSpinner";
import Empty from "components/Empty";

interface ApiKeyTableProps {
  compact?: boolean;
}

function ApiKeyTable ({ compact }: ApiKeyTableProps) {
  const { apiKeys, isLoading } = useApiKey();

  if (isLoading) {
    return <FullPageSpinner />
  } else if (apiKeys.length <= 0) {
    return <Empty/>
  } else if (compact) {
    return null;
  } else if (!compact) {
    return <NormalTable apiKeys={apiKeys} />
  }
}

export default ApiKeyTable;
