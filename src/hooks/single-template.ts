import Config from "config";
import Template from "entities/template";

import useUser from "hooks/user";
import useSWR from "swr";
import { useState, useEffect } from "react";

interface UseSingleTemplateProps {
  id: string;
}

export function useSingleTemplate ({ id }: UseSingleTemplateProps) {
  const [template, setTemplate] = useState<Template>();
  const { token } = useUser();
  const { data, error, mutate } = useSWR(
    () => {
      if (!id) return undefined;
      return [`${Config.apiDomain}/templates/${id}`, token];
    }
  );

  useEffect(
    () => {
      if (!data) return;
      
      const template = Template.fromResponse(data);
      setTemplate(template);
    },
    [data]
  )

  return {
    template,
    mutate,
    isLoading: !template && !error
  }
}

