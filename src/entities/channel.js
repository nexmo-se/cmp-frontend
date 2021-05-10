// @flow
import Application from "entities/application";
import APIKey from "entities/apiKey";

interface Constructor {
  id?: string;
  name?: string;
  channel?: string;
  senderId?: string;
  tps?: number;
  smsUseSignature?: boolean;
  application?: ?Application;
  apiKey?: ?APIKey;
}

class Channel {
  static acceptedChannel = ["sms", "whatsapp", "viber", "voice", "number_insight"];
  static channelMapping = {
    sms: "SMS",
    whatsapp: "Whatsapp",
    viber: "Viber",
    voice: "Voice",
    number_insight: "Number Insight"
  }

  id: ?string;
  name: ?string;
  channel: ?string;
  senderId: ?string;
  tps: number;
  smsUseSignature: boolean;
  application: ?Application;
  apiKey: ?APIKey;
  

  constructor (args: Constructor) {
    this.id = args.id;
    this.name = args.name;
    this.channel = args.channel;
    this.senderId = args.senderId;
    this.tps = args.tps ?? 15;
    this.smsUseSignature = args.smsUseSignature ?? false;
    this.application = args.application;
    this.apiKey = args.apiKey
    
  }

  toRequest () {
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

  static fromResponse (value: any): Channel {
    const channel = new Channel({
      id: value.id,
      name: value.name,
      channel: value.channel,
      senderId: value.senderId,
      tps: parseInt(value.tps),
      smsUseSignature: value.smsUseSignature,
      application: (value.cmpApplication)? Application.fromResponse(value.cmpApplication): undefined,
      apiKey: (value.cmpApiKey)? APIKey.fromResponse(value.cmpApiKey): undefined
    });
    
    return channel;
  }
}
export default Channel;