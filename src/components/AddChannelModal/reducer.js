import APIKey from "entities/apiKey";
import Application from "entities/application";

type Props = {
  name:string,
  channel:string,
  senderId:string,
  tps:number,
  apiKey:APIKey,
  application:Application,
  isClean:booelan
};

export const initialState:Props = {
  name: "",
  channel: "",
  smsUseSignature: false,
  senderId: "",
  tps: 15,
  apiKey: undefined,
  application: undefined,
  isClean:false
}

export default function reducer(state, action){
  const nameValid = !!state.name;
  const channelValid = !!state.channel;
  const senderIdValid = !!state.channel;
  const apiKeyValid = !!state.apiKey;
  const applicationValid = state.channel === "sms"? true: !!state.application;

  switch(action.type){
    case "CHANGE_VALUE":
      return Object.assign({}, state, { [action.valueName]: action.value });
    case "CLEAR_INPUT":
      return initialState;
    case "SELECT_WHATSAPP":
      return Object.assign({}, state, { channel: "whatsapp" });
    case "SELECT_SMS":
      return Object.assign({}, state, { channel: "sms" });
    case "CHECK_CLEAN":
      return Object.assign({}, state, {
        isClean: nameValid && channelValid && senderIdValid && apiKeyValid && applicationValid
      })
    default:
      throw new Error("Ops! something went wrong");
  }
}