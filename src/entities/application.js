import Channel from "entities/channel";
import APIKey from "entities/apiKey";

class Application{
  // name:string|void
  // apiKey:ApiKey|void
  // applicationId:string|void;
  // id:string|void;
  // privateKey:string|void;
  // channels:Array<Channel>|void;
  // apiKey:APIKey|void;

  constructor(name, apiKey, applicationId, id=null, privateKey=null, channels=[], users=[]){
    this.name = name;
    this.apiKey = apiKey;
    this.applicationId = applicationId;
    this.id = id;
    this.privateKey = privateKey;
    this.channels = channels;
    this.users = users;
  }

  toJSON(){
    return {
      name: this.name,
      cmpApiKeyId: this.apiKey.id,
      applicationId: this.applicationId,
      privateKey: this.privateKey
    }
  }

  static fromJSON(value){
    const app = new Application();
    app.id = value.id;
    app.name = value.name;
    app.applicationId = value.applicationId;

    if(value.cmpChannels){
      app.channels = value.cmpChannels.map((channel) => Channel.fromJSON(channel));
    }

    if(value.cmpApiKey){
      app.apiKey = APIKey.fromJSON(value.cmpApiKey);
    }

    return app;
  }
}
export default Application;