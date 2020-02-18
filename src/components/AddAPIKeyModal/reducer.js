export const initialState = {
  name: "",
  apiKey: "",
  apiSecret: "",
  signatureSecret: "",
  signatureMethod: "md5hash"
}

export default function reducer(state, action){
  switch(action.type){
    case "CHANGE_VALUE":
      return Object.assign({}, state, { [action.valueName]: action.value });
    case "CLEAR_INPUT":
      return initialState;
    default:
      throw new Error("Ops! something went wrong");
  }
}