import faker from "faker";
import ApiKey from "entities/apiKey";

class ApiKeyAPI{
  static  generateDummy(){
    const key = new ApiKey(faker.random.uuid(), faker.random.word(), faker.random.alphaNumeric(8));
    key.cmpApplications = new Array(faker.random.number(5));
    key.cmpChannels = new Array(faker.random.number(5));
    key.users = new Array(faker.random.number(5));
    return key;
  }

  static listApiKey(dummy=false){
    const keys = [];
    for(let a=0; a < faker.random.number(20) && dummy; a++) keys.push(ApiKeyAPI.generateDummy());
    return keys;
  }
}
export default ApiKeyAPI;