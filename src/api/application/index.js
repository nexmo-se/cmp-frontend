import faker from "faker";
import ApiKey from "entities/apiKey";
import Application from "entities/application";

class ApplicationAPI{
  static generateDummy(){
    const key = new ApiKey(faker.random.uuid(), faker.random.word(), faker.random.alphaNumeric(8));
    const application = new Application(faker.random.word(), key, faker.random.uuid());
    application.cmpChannels = new Array(faker.random.number(5));
    application.users = new Array(faker.random.number(5));
    return application;
  }

  static listApplication(dummy=false){
    const applications = [];
    const randomNumber = faker.random.number(20);
    for(let a=0; a < randomNumber && dummy; a++) applications.push(ApplicationAPI.generateDummy());
    return applications;
  }
}
export default ApplicationAPI;