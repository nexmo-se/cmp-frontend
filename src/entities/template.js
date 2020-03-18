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

  toJSON(){
    return {
      name: this.name,
      cmpChannelId: this.channel.id,
      whatsappTemplateNamespace: this.whatsappTemplateNamespace,
      whatsappTemplateName: this.whatsappTemplateName,
      mediaType: this.mediaType,
      body: this.body
    }
  }

  static fromID(id){
    const template = new Template(id);
    return template;
  }

  static fromJSON(value){
    const t = new Template();
    t.id = value.id;
    t.name = value.name;
    t.body = value.body;
    t.whatsappTemplateName = value.whatsappTemplateName;
    t.whatsappTemplateNamespace = value.whatsappTemplateNamespace;
    t.mediaType = value.mediaType;

    if(value.cmpChannel) t.channel = Channel.fromJSON(value.cmpChannel);
    else if(value.cmpChannelId){
      t.channel = new Channel();
      t.channel.id = value.cmpChannelId
    }
    return t;
  }
}
export default Template;