export const initialState = {
  name: "",
  channel: null,
  loadingChannel: false,
  mediaType: "",
  content: {}
}

export default function reducer(state, action){
  switch(action.type){
    case "CHANGE_NAME": 
      return Object.assign({}, state, { name: action.value });
    case "CHANGE_CHANNEL":
      return Object.assign({}, state, { channel: action.value });
    case "CHANGE_MEDIA_TYPE":
      return Object.assign({}, state, { mediaType: action.value });
    case "CHANGE_CONTENT":
      return Object.assign({}, state, { content: action.value });
    case "LOADING_CHANNEL":
      return Object.assign({}, state, { loadingChannel: true });
    case "LOADED_CHANNEL":
      return Object.assign({}, state, { loadingChannel: false });
    case "CLEAR_INPUT":
      return initialState;
    default:
      throw new Error("Ops! something went wrong");
  }
}