import Channel from "entities/channel";

class Application{
  // name:string|void
  // apiKey:ApiKey|void
  // applicationId:string|void;
  // id:string|void;
  // privateKey:string|void;
  // channels:Array<Channel>|void;

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

    return app;
  }
}
export default Application;