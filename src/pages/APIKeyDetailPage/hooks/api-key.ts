import Config from "config";
import ApiKey from "entities/apiKey";

import useSWR from "swr";
import useUser from "hooks/user";
import { useEffect, useState } from "react";

interface UseSingleApiKeyProps {
  id: string;
}

export function useSingleApiKey ({ id }: UseSingleApiKeyProps) {
  const [apiKey, setApiKey] = useState<ApiKey>();
  const { token } = useUser();
  const { data, error, mutate } = useSWR([`${Config.apiDomain}/apikeys/${id}`, token]);

  useEffect(
    () => {
      if (!data) return;
      
      const apiKey = ApiKey.fromResponse(data);
      setApiKey(apiKey);
    },
    [data]
  )

  return {
    apiKey,
    mutate,
    isLoading: !data && !error
  }
}
