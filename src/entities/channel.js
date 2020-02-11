class Channel{
  // name: String
  // channel: String
  // senderId: String
  // apiKey: ApiKey
  // tps: int
  // smsUseSignature: boolean
  // application: Application

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

  static fromJSON(value){
    const ch = new Channel();
    ch.id = value.id;
    ch.name = value.name;
    ch.channel = value.channel;
    ch.senderId = value.senderId;
    ch.tps = value.tps;
    return ch;
  }
}
export default Channel;