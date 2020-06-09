// @flow
import Channel from "entities/channel";
import Application from "entities/application";

class APIKey{
  id:string|void;
  name:string;
  apiKey:string;
  apiSecret:string;
  applications:Array<Application>;
  channels:Array<Channel>;

  constructor(args:any){
    this.applications = [];
    this.channels = [];
    if(args) Object.assign(this, args);
  }

  get key(){ return this.apiKey }

  toRequest(){
    const jsonData = {
      id: this.id,
      name: this.name,
      apiKey: this.apiKey,
      apiSecret: this.apiSecret
    }
    return JSON.parse(JSON.stringify(jsonData));
  }

  toJSON(){
    return this.toRequest();
  }

  static fromResponse(response:any):APIKey{
    if(!response) throw new Error("Server might return nothing. Please check your internet connection");
    const key = new APIKey(response);
    key.applications = response.cmpApplications?.map((application) => Application.fromResponse(application)) ?? [];
    key.channels = response.cmpChannels?.map((channel) => Channel.fromResponse(channel)) ?? [];
    return key;
  }

}
export default APIKey;