class Application{
  // name: String
  // apiKey: ApiKey
  // applicationId: String
  // id: String
  // privateKey: String

  constructor(name, apiKey, applicationId, id=null, privateKey=null, cmpChannels=[], users=[]){
    this.name = name;
    this.apiKey = apiKey;
    this.applicationId = applicationId;
    this.id = id;
    this.privateKey = privateKey;
    this.cmpChannels = cmpChannels;
    this.users = users;
  }
}
export default Application;