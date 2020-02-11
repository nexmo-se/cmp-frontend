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

  static fromJSON(value){
    const app = new Application();
    app.id = value.id;
    app.name = value.name;
    app.applicationId = value.applicationId;
    return app;
  }
}
export default Application;