import Channel from "entities/channel";

class Template{
  // id: String
  // name: String
  // channel: Channel
  // body: String
  // whatsappTemplateName: String
  // whatsappTemplateNamespace: String
  // mediaType: String

  constructor(id, name, channel, body=null, whatsappTemplateNamespace=null, whatsappTemplateName=null, mediaType="text"){
    this.id = id;
    this.name = name;
    this.channel = channel;
    this.body = body;
    this.whatsappTemplateName = whatsappTemplateName;
    this.whatsappTemplateNamespace = whatsappTemplateNamespace;
    this.mediaType = mediaType;
  }

  static fromJSON(value){
    const t = new Template();
    t.id = value.id;
    t.name = value.name;
    t.body = value.body;
    t.whatsappTemplateName = value.whatsappTemplateName;
    t.whatsappTemplateNamespace = value.whatsappTemplateNamespace;
    t.mediaType = value.mediaType;

    t.channel = new Channel();
    t.channel.id = value.cmpChannelId;
    return t;
  }
}
export default Template;