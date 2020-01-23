import faker from "faker";
import ApiKey from "entities/apiKey";
import Application from "entities/application";
import Channel from "entities/channel";

class ChannelAPI{
  static generateDummy(){
    const key = new ApiKey(faker.random.uuid(), faker.random.word(), faker.random.alphaNumeric(8));
    const application = new Application(faker.random.word(), key, faker.random.uuid());
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