import Config from "config";
import FetchAPI from "api/fetch";
import lodash from "lodash";

import Template from "entities/template";
import Channel from "entities/channel";

import useSWR from "swr";
import useUser from "hooks/user";
import { useState, useEffect } from "react";

interface CreateOptions {
  body: string;
  whatsappTemplateName?: string;
  whatsappTemplateNamespace?: string;
  channel: Channel;
  name: string;
  mediaType: string;
}

interface UpdateOptions {
  name: string;
  mediaType: string;
  body: string;
}

interface RemoveOptions {
  id: string;
}

function useTemplate () {
  const [templates, setTemplates] = useState<Template[]>();
  const { token } = useUser();
  const { data, error, mutate } = useSWR([`${Config.apiDomain}/templates`, token]);

  async function create (options: CreateOptions) {
    const url = `${Config.apiDomain}/templates`;
    const body = JSON.stringify({
      name: options.name,
      cmpChannelId: options.channel.id,
      whatsappTemplateNamespace: options.whatsappTemplateNamespace,
      whatsappTemplateName: options.whatsappTemplateName,
      mediaType: options.mediaType,
      body: options.body
    });

    await FetchAPI.post({ url, token, body });
    await mutate();
  }

  async function update (id: string, options: UpdateOptions) {
    if (!token) return;

    const url = `${Config.apiDomain}/templates/${id}`;
    const payload = {
      name: options.name,
      mediaType: options.mediaType,
      body: options.body
    }
    await FetchAPI.put(url, token, JSON.stringify(payload));
    await mutate();
  }  

  async function remove ({ id }: RemoveOptions) {
    if (!token) return ;

    const url = `${Config.apiDomain}/templates/${id}`;
    await FetchAPI.remove(url, token);
    await mutate();
  }

  useEffect(
    () => {
      if (!data) return;

      const templates = lodash.map(data, Template.fromResponse);
      setTemplates(templates);
    },
    [data]
  )

  return {
    templates,
    create,
    remove,
    update,
    isLoading: !templates && !error
  }
}

export default useTemplate;
