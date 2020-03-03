class APIKey{
  // id: String
  // name: String
  // apiKey: String
  // signatureSecret: String
  // signatureMethod: String
  // cmpApplications: Array of Application
  // cmpChannels = Array of Channel
  // users = Array of User

  constructor(id, name, apiKey, apiSecret, signatureSecret, signatureMethod, cmpApplications=[], cmpChannels=[], users=[]){
    this.id = id;
    this.name = name;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.signatureSecret = signatureSecret;
    this.signatureMethod = signatureMethod;
    this.cmpApplications = cmpApplications;
    this.cmpChannels = cmpChannels;
    this.users = users;
  }

  get key(){ return this.apiKey }

  toJSON(){
    return {
      name: this.name,
      apiKey: this.apiKey,
      apiSecret: this.apiSecret
    }
  }

  static fromJSON(value){
    if(value === null) return null;
    const key = new APIKey();
    key.id = value.id;
    key.name = value.name;
    key.apiKey = value.apiKey;
    return key;
  }
}
export default APIKey;