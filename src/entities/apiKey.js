import Channel from "entities/channel";
import Application from "entities/application";

class APIKey{
  // id:string|void;
  // name:string|void;
  // apiKey:string|void
  // signatureSecret:string|void;
  // signatureMethod:string|void;
  // applications:Array<Application>|void;
  // channels:Array<Channel>|void;
  // users:Array<User>|void;

  constructor(id, name, apiKey, apiSecret, signatureSecret, signatureMethod, applications=[], channels=[], users=[]){
    this.id = id;
    this.name = name;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.signatureSecret = signatureSecret;
    this.signatureMethod = signatureMethod;
    this.applications = applications;
    this.channels = channels;
    this.users = users;
  }

  get key(){ return this.apiKey }

  toJSON(){
    const jsonData = {
      id: this.id,
      name: this.name,
      apiKey: this.apiKey,
      apiSecret: this.apiSecret
    }
    return JSON.parse(JSON.stringify(jsonData));
  }

  static fromJSON(value){
    if(value === null) return null;
    const key = new APIKey();
    key.id = value.id;
    key.name = value.name;
    key.apiKey = value.apiKey;

    if(value.cmpApplications){
      key.applications = value.cmpApplications.map((application) => Application.fromJSON(application));
    }

    if(value.cmpChannels){
      key.channels = value.cmpChannels.map((channel) => Channel.fromJSON(channel));
    }
    return key;
  }

  static fromID(value){
    const apiKey = new APIKey(value);
    return apiKey;
  }
}
export default APIKey;