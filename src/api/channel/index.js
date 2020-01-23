import faker from "faker";
import ApplicationAPI from "api/application";
import ApiKeyAPI from "api/apiKey";
import Channel from "entities/channel";

class ChannelAPI{
  static generateDummy(){
    const application = ApplicationAPI.generateDummy();
    const key = ApiKeyAPI.generateDummy();
    const channel = new Channel(faker.random.word(), faker.random.arrayElement([ "sms", "whatsapp" ]), faker.random.word(), key, faker.random.number(100), application, false);
    return channel;
  }

  static listChannel(dummy=false){
    const channels = [];
    const randomNumber = faker.random.number(20);
    for(let a=0; a < randomNumber && dummy; a++) channels.push(ChannelAPI.generateDummy());
    return channels
  }
}
export default ChannelAPI;