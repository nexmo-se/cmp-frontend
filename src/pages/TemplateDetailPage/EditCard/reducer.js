// @flow
import Channel from "entities/channel";

type Content = {
  body:string,
  whatsappTemplateName:string,
  whatsappTemplateNamespace:string
}

type Props = {
  id:string,
  name:string,
  content:Content,
  channel:Channel|void,
  isEditing:boolean,
  mediaType:string,
}

export const initialState:Props = {
  id: "",
  name: "",
  channel: undefined,
  mediaType: "",
  content: {
    body: "",
    whatsappTemplateName: "",
    whatsappTemplateNamespace: ""
  },
  isEditing: false
}

export default function reducer(state:Props, action:any){
  if(action.type === "CHANGE_NAME"){
    return Object.assign({}, state, { name: action.value });
  }else if(action.type === "CHANGE_MEDIA_TYPE"){
    return Object.assign({}, state, { mediaType: action.value });
  }else if(action.type === "INIT_VALUES"){
    const content = {
      body: action.value.body,
      whatsappTemplateName: action.value.whatsappTemplateName,
      whatsappTemplateNamespace: action.value.whatsappTemplateNamespace
    };
    return Object.assign({}, state, {
      id: action.value.id,
      name: action.value.name,
      channel: action.value.channel,
      mediaType: action.value.mediaType,
      content
    });
  }else if(action.type === "CHANGE_CONTENT"){
    return Object.assign({}, state, { content: action.value })
  }else if(action.type === "START_EDITING"){
    return Object.assign({}, state, { isEditing: true });
  }else if(action.type === "FINISH_EDITING"){
    return Object.assign({}, state, { isEditing: false });
  }else return state;
}