import faker from "faker";
import ChannelAPI from "api/channel";
import ApiKeyAPI from "api/apiKey";
import Template from "entities/template";

class TemplateAPI{
  static generateDummy(){
    const channel = ChannelAPI.generateDummy();
    const apiKey = ApiKeyAPI.generateDummy();
    const template = new Template(faker.random.uuid(), faker.random.word(), channel, apiKey);
    return template;
  }

  static async listTemplate(dummy=false){
    const templates = [];
    const randomNumber = faker.random.number(20);
    for(let a=0; a < randomNumber && dummy; a++) templates.push(TemplateAPI.generateDummy());
    return templates;
  }
}
export default TemplateAPI;