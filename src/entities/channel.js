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
}
export default Channel;