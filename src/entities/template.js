class Template{
  // id: String
  // name: String
  // channel: Channel
  // apiKey: ApiKey
  // body: String
  // whatsappTemplateName: String
  // whatsappTemplateNamespace: String
  // mediaType: String

  constructor(id, name, channel, apiKey, body=null, whatsappTemplateNamespace=null, whatsappTemplateName=null, mediaType="text"){
    this.id = id;
    this.name = name;
    this.channel = channel;
    this.apiKey = apiKey;
    this.body = body;
    this.whatsappTemplateName = whatsappTemplateName;
    this.whatsappTemplateNamespace = whatsappTemplateNamespace;
    this.mediaType = mediaType;
  }
}
export default Template;