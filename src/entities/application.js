// @flow
import Channel from "entities/channel";
import APIKey from "entities/apiKey";

class Application{
  id:string|void;
  name:string;
  apiKey:APIKey;
  applicationId:String;
  privateKey:string;
  channels:Array<Channel>;

  constructor(args:any){
    if(args) Object.assign(this, args);
  }

  toJSON(){
    return {
      name: this.name,
      cmpApiKeyId: this.apiKey.id,
      applicationId: this.applicationId,
      privateKey: this.privateKey
    }
  }

  static fromResponse(response:any):Application{
    const app = new Application(response);
    app.channels = response.cmpChannels?.map((channel) => Channel.fromResponse(channel)) ?? []

    if(response.cmpApiKey) app.apiKey = APIKey.fromResponse(response.cmpApiKey);
    else if(response.cmpApiKeyId) app.apiKey = new APIKey({ id: response.cmpApiKeyId });
    return app;
  }
}
export default Application;