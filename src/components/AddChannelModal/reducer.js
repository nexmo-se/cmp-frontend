export const initialState = {
  name: "",
  channel: "",
  smsUseSignature: false,
  senderId: "",
  tps: "",
  apiKey: "",
  application: ""
}

export default function reducer(state, action){
  switch(action.type){
    case "CHANGE_VALUE":
      return Object.assign({}, state, { [action.valueName]: action.value });
    case "CLEAR_INPUT":
      return initialState;
    case "SELECT_WHATSAPP":
      return Object.assign({}, state, { channel: "whatsapp" });
    case "SELECT_SMS":
      return Object.assign({}, state, { channel: "sms" });
    default:
      throw new Error("Ops! something went wrong");
  }
}