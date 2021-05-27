import Config from "config";
import Channel from "entities/channel";

import useUser from "hooks/user";
import useSWR from "swr";
import { useState, useEffect } from "react";

interface UseSingleChannelProps {
  id?: string;
}

export function useSingleChannel ({ id }: UseSingleChannelProps) {
  const [channel, setChannel] = useState<Channel>();
  const { token } = useUser();
  const { data, error } = useSWR(
    () => {
      if (!id) return null;
      return [`${Config.apiDomain}/channels/${id}`, token];
    }
  );

  useEffect(
    () => {
      if (!data) return;
      const channel = Channel.fromResponse(data);
      setChannel(channel);
    },
    [data]
  )

  return {
    channel,
    isLoading: !data && !error
  }
}

