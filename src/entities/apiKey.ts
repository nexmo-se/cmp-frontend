import lodash from "lodash";

import Channel from "entities/channel";
import Application from "entities/application";

interface Constructor {
  id: string;
  name: string;
  apiKey: string;
  applications?: Application[];
  channels?: Channel[]
}

class ApiKey {
  id: string;
  name: string;
  apiKey: string;
  applications?: Application[];
  channels?: Channel[];

  constructor (args: Constructor) {
    this.id = args.id;
    this.name = args.name;
    this.apiKey = args.apiKey;
    this.applications = args.applications ?? [];
    this.channels = args.channels ?? [];
  }

  get key() {
    return this.apiKey
  }

  static fromResponse (response: Record<string, any>): ApiKey {
    return new ApiKey({
      id: response.id,
      name: response.name,
      apiKey: response.apiKey,
      applications: response.cmpApplications && lodash(response.cmpApplications).map(Application.fromResponse).value(),
      channels: response.cmpChannels && lodash(response.cmpChannels).map(Channel.fromResponse).value()
    })
  }

}

export default ApiKey;
