import Channel from "entities/channel";

export const initialState = {
  id: "",
  name: "",
  channel: null,
  whatsappTemplateName: "",
  whatsappTemplateNamespace: "",
  body: "",
  isEditing: false
}

export default function reducer(state, action){
  switch(action.type){
    case "CHANGE_NAME":
      return Object.assign({}, state, { name: action.value });
    case "CHANGE_BODY":
      return Object.assign({}, state, { body: action.value })
    case "INIT_VALUES":
      return Object.assign({}, state, action.value);
    case "START_EDITING":
      return Object.assign({}, state, { isEditing: true });
    case "FINISH_EDITING":
      return Object.assign({}, state, { isEditing: false });
    default:
      return state;
  }
}