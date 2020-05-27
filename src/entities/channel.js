// @flow
import Application from "entities/application";
import APIKey from "entities/apiKey";

class Channel{
  id:string|void;
  name:string;
  channel:string;
  senderId:string;
  tps:number;
  smsUseSignature:boolean;
  application:Application|void;
  apiKey:APIKey|void;
  

  constructor(args:any){
    this.id = undefined;
    this.name = "";
    this.channel = "";
    this.senderId = "";
    this.tps = 15;
    this.smsUseSignature = false;
    this.application = undefined;
    this.apiKey = undefined;

    if(args) Object.assign(this, args);
  }

  toJSON(){
    const jsonData = {
      id: this.id,
      name: this.name,
      channel: this.channel,
      senderId: this.senderId,
      tps: parseInt(this.tps),
      smsUseSignature: this.smsUseSignature,
      cmpApiKeyId: this.apiKey?.id,
      cmpApplicationId: this.application?.id
    }
    return JSON.parse(JSON.stringify(jsonData));
  }

  static fromJSON(value:any):Channel{
    const ch = new Channel({ ...value});
    ch.id = value.id;
    ch.name = value.name;
    ch.channel = value.channel;
    ch.senderId = value.senderId;
    ch.tps = parseInt(value.tps);
    ch.smsUseSignature = value.smsUseSignature;

    if(value.cmpApplication) ch.application = Application.fromJSON(value.cmpApplication)
    if(value.cmpApiKey) ch.apiKey = APIKey.fromJSON(value.cmpApiKey);

    return ch;
  }
}
export default Channel;