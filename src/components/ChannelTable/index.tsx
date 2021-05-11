import Channel from "entities/channel";

import useChannel from "hooks/channel";
import useError from "hooks/error";
import { useEffect, useState } from "react";

import Empty from "components/Empty";
import FullPageSpinner from "components/FullPageSpinner";
import NormalTable from "./components/NormalTable";
import CompactTable from "./components/ComtactTable";

interface ChannelTableProps {
  compact: boolean;
}

function ChannelTable ({ compact }: ChannelTableProps) {
  const [isFetching, setIsFetching] = useState(true);
  const { channels, isLoading } = useChannel();

  if (isLoading) {
    return <FullPageSpinner />
  } else if (channels.length <= 0) {
    return <Empty />;
  } else if (compact) {
    return <CompactTable channels={channels} />;
  } else if (!compact) {
    return <NormalTable channels={channels} />
  }
}
export default ChannelTable;