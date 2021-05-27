import useChannel from "hooks/channel";

import Empty from "components/Empty";
import FullPageSpinner from "components/FullPageSpinner";
import NormalTable from "./components/NormalTable";
import CompactTable from "./components/CompactTable";

interface ChannelTableProps {
  compact?: boolean;
}

function ChannelTable ({ compact }: ChannelTableProps) {
  const { channels, isLoading } = useChannel();

  if (isLoading) {
    return <FullPageSpinner />
  } else if (channels.length <= 0) {
    return <Empty />;
  } else if (compact) {
    return <CompactTable channels={channels} />;
  } else if (!compact) {
    return <NormalTable channels={channels} />
  } else return null;
}
export default ChannelTable;