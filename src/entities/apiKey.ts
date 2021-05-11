import lodash from "lodash";

import Channel from "entities/channel";
import Application from "entities/application";

interface Constructor {
  id?: string;
  name?: string;
  apiKey?: string;
  apiSecret?: string;
  applications?: Application[];
  channels?: Channel[];
}

class ApiKey {
  id?: string;
  name?: string;
  apiKey?: string;
  apiSecret?: string;
  applications?: Application[];
  channels?: Channel[];

  constructor (args: Constructor) {
    this.id = args.id;
    this.name = args.name;
    this.apiKey = args.apiKey;
    this.apiSecret = args.apiSecret;
    this.applications = args.applications ?? [];
    this.channels = args.channels ?? [];
  }

  get key() {
    return this.apiKey
  }

  toRequest () {
    const jsonData = {
      name: this.name,
      apiKey: this.apiKey,
      apiSecret: this.apiSecret
    }
    return JSON.parse(JSON.stringify(jsonData));
  }

  toJSON () {
    const jsonData = {
      id: this.id,
      name: this.name,
      apiKey: this.apiKey,
      apiSecret: this.apiSecret
    };

    return JSON.parse(JSON.stringify(jsonData));
  }

  static fromResponse (response: Record<string, any>): ApiKey {
    return new ApiKey({
      id: response.id,
      name: response.name,
      apiKey: response.apiKey,
      apiSecret: response.apiSecret,
      applications: response.cmpApplications && lodash(response.cmpApplications).map(Application.fromResponse).value(),
      channels: response.cmpChannels && lodash(response.cmpChannels).map(Channel.fromResponse).value()
    })
  }

}
export default ApiKey;