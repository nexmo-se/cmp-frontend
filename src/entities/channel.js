import Application from "entities/application";
import APIKey from "entities/apiKey";

class Channel{
  // name:string|void
  // channel:string|void
  // senderId:string|void
  // tps:number|void
  // smsUseSignature:boolean|void
  // application:Application|void
  // apiKey:APIKey|void

  constructor(name, channel, senderId, apiKey, id=null, tps=100, application=null, smsUseSignature=false){
    this.id = id;
    this.name = name;
    this.channel = channel;
    this.senderId = senderId;
    this.apiKey = apiKey;
    this.tps = tps;
    this.smsUseSignature = smsUseSignature;
    this.application = application;
  }

  toJSON(){
    return {
      name: this.name,
      channel: this.channel,
      senderId: this.senderId,
      tps: this.tps,
      smsUseSignature: this.smsUseSignature,
      cmpApiKeyId: this.apiKey?.id || undefined,
      cmpApplicationId: this.application?.id || undefined
    }
  }

  static fromID(id){
    const ch = new Channel();
    ch.id = id;
    return ch;
  }

  static fromJSON(value){
    const ch = new Channel();
    ch.id = value.id;
    ch.name = value.name;
    ch.channel = value.channel;
    ch.senderId = value.senderId;
    ch.tps = parseInt(value.tps);
    ch.smsUseSignature = value.smsUseSignature;

    if(value.cmpApplication){
      ch.application = Application.fromJSON(value.cmpApplication)
    }

    if(value.cmpApiKey){
      ch.apiKey = APIKey.fromJSON(value.cmpApiKey);
    }

    return ch;
  }
}
export default Channel;