import lodash from "lodash";
import Channel from "entities/channel";
import ApiKey from "entities/apiKey";

interface Constructor {
  id?: string;
  name?: string;
  apiKey?: ApiKey;
  applicationId?: string;
  privateKey?: string;
  channels: Channel[];
}

class Application {
  id?: string;
  name?: string;
  apiKey?: ApiKey;
  applicationId?: string;
  privateKey?: string;
  channels: Channel[];

  constructor (args: Constructor) {
    this.id = args.id;
    this.name = args.name;
    this.apiKey = args.apiKey;
    this.applicationId = args.applicationId;
    this.privateKey = args.privateKey;
    this.channels = args.channels;
  }

  static fromResponse (response: Record<string, any>): Application {
    return new Application({
      id: response.id,
      name: response.name,
      applicationId: response.applicationId,
      privateKey: response.privateKey,
      channels: response.cmpChannels && lodash(response.cmpChannels).map(Channel.fromResponse).value(),
      apiKey: ApiKey.fromResponse(response.cmpApiKey)
    });
  }
}
export default Application;