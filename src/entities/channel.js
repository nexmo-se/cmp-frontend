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
    this.tps = 15;
    this.smsUseSignature = false;

    if(args) Object.assign(this, args);
  }

  toRequest(){
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

  static fromResponse(value:any):Channel{
    const ch = new Channel({ ...value});
    ch.tps = parseInt(value.tps);

    if(value.cmpApplication) ch.application = Application.fromResponse(value.cmpApplication)
    if(value.cmpApiKey) ch.apiKey = APIKey.fromResponse(value.cmpApiKey);

    return ch;
  }
}
export default Channel;