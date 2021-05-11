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

  toJSON () {
    return JSON.parse(JSON.stringify({
      name: this.name,
      cmpApiKeyId: this.apiKey.id,
      applicationId: this.applicationId,
      privateKey: this.privateKey
    }))
  }

  static fromResponse (response: Record<string, any>): Application {
    const retrieveApiKey = (response: Record<string, any>) => {
      if (response.cmpApiKey) {
        return ApiKey.fromResponse(response.cmpApiKey);
      } else if (response.cmpApiKeyId) {
        return new ApiKey({ id: response.cmpApiKeyId })
      } else return undefined;
    }

    return new Application({
      id: response.id,
      name: response.name,
      applicationId: response.applicationId,
      privateKey: response.privateKey,
      channels: response.cmpChannels && lodash(response.cmpChannels).map(Channel.fromResponse).value(),
      apiKey: retrieveApiKey(response)
    });
  }
}
export default Application;