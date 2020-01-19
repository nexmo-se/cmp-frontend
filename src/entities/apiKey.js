class ApiKey{
  // id: String
  // name: String
  // apiKey: String
  // cmpApplications: Array of Application
  // cmpChannels = Array of Channel
  // users = Array of User

  constructor(id, name, apiKey, cmpApplications=[], cmpChannels=[], users=[]){
    this.id = id;
    this.name = name;
    this.apiKey = apiKey;
    this.cmpApplications = cmpApplications;
    this.cmpChannels = cmpChannels;
    this.users = users;
  }

  get key(){ return this.apiKey }
}
export default ApiKey;