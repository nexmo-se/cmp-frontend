// @flow
import Channel from "entities/channel";

interface Constructor {
  id?: ?string;
  name?: string;
  channel?: ?Channel;
  body?: string;
  whatsappTemplateName?: ?string;
  whatsappTemplateNamespace?: ?string;
  mediaType?: ?string;
}

class Template {
  id: ?string;
  name: ?string;
  channel: ?Channel;
  body: ?string;
  whatsappTemplateName: ?string;
  whatsappTemplateNamespace: ?string;
  mediaType: ?string;

  constructor (args: Constructor) {
    this.id = args.id;
    this.name = args.name;
    this.channel = args.channel;
    this.body = args.body;
    this.whatsappTemplateName = args.whatsappTemplateName;
    this.whatsappTemplateNamespace = args.whatsappTemplateNamespace;
  }

  get additionalColumns(): Array<string>{
    switch (this.mediaType) {
      case "audio": return [ "url" ];
      case "file": return [ "url", "fileName" ];
      case "image": return [ "url" ];
      case "location": return [ "latitude", "longitude", "name", "address" ];
      case "text": return [ "text" ];
      case "viber_template": return [ "url", "caption", "actionUrl" ];
      case "video": return [ "url" ];
      case "voice": 
        return [
          "voice_voiceType",
          "voice_language",
          "voice_style",
          "voice_streamUrl",
          "voice_answerUrl"
        ]
      default: return []
    }
  }

  get parameters (): string[] {
    return this.body?.match(/{{\d+}}/g) ?? [];
  }

  get parameterColumns():Array<string>{
    return this.parameters.map((parameter) => "parameter");
  }

  toRequest(){
    if (!this.channel) throw new Error("You must provide channel");

    const jsonData = {
      id: this.id,
      name: this.name,
      cmpChannelId: this.channel.id,
      whatsappTemplateNamespace: this.whatsappTemplateNamespace ?? undefined,
      whatsappTemplateName: this.whatsappTemplateName ?? undefined,
      mediaType: this.mediaType,
      body: this.body? this.body: undefined
    }
    return JSON.parse(JSON.stringify(jsonData));
  }

  toUpdateRequest(){
    const jsonData = {
      name: this.name,
      mediaType: this.mediaType,
      body: this.body
    }
    return JSON.parse(JSON.stringify(jsonData));
  }

  static fromResponse(value:any):Template{
    const t = new Template({ ...value });

    if (value.cmpChannel) t.channel = Channel.fromResponse(value.cmpChannel);
    else if (value.cmpChannelId){
      t.channel = new Channel({
        id: value.cmpChannelId
      });
    }else if (value.channel) t.channel = value.channel;
    return t;
  }
}
export default Template;