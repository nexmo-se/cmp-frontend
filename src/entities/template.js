// @flow
import Channel from "entities/channel";

class Template{
  id:string|void;
  name:string;
  channel:Channel;
  body:string;
  whatsappTemplateName:string|void;
  whatsappTemplateNamespace:string|void;
  mediaType:string;

  constructor(args:any){
    if(args) Object.assign(this, args);
  }

  get additionalColumns():Array<string>{
    switch(this.mediaType){
      case "audio": return [ "url" ];
      case "file": return [ "url", "fileName" ];
      case "image": return [ "url" ];
      case "location": return [ "latitude", "longitude", "name", "address" ];
      case "text": return [ "text" ];
      case "viber_template": return [ "url", "caption", "actionUrl" ];
      case "video": return [ "url" ];
      default: return []
    }
  }

  get parameters():Array<string>{
    return this.body.match(/{{\d+}}/g) ?? [];
  }

  get parameterColumns():Array<string>{
    return this.parameters.map((parameter) => "parameter");
  }

  toRequest(){
    const jsonData = {
      id: this.id,
      name: this.name,
      cmpChannelId: this.channel.id,
      whatsappTemplateNamespace: this.whatsappTemplateNamespace || undefined,
      whatsappTemplateName: this.whatsappTemplateName || undefined,
      mediaType: this.mediaType,
      body: this.body
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

    if(value.cmpChannel) t.channel = Channel.fromResponse(value.cmpChannel);
    else if(value.cmpChannelId){
      t.channel = new Channel();
      t.channel.id = value.cmpChannelId
    }else if(value.channel) t.channel = value.channel;
    return t;
  }
}
export default Template;