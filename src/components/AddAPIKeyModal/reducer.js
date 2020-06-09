// @flow
type Props = {
  name:string,
  apiKey:string,
  apiSecret:string,
  isClean:boolean
}

export const initialState:Props = {
  name: "",
  apiKey: "",
  apiSecret: "",
  isClean:false
}

export default function reducer(state:any, action:any){
  switch(action.type){
    case "CHANGE_VALUE":
      return Object.assign({}, state, { [action.valueName]: action.value });
    case "CLEAR_INPUT":
      return initialState;
    case "CHECK_CLEAN":
      const nameValid = !!state.name;
      const keyValid = !!state.apiKey;
      const secretValid = !!state.apiSecret;
      return Object.assign({}, state, { isClean: nameValid && keyValid && secretValid });
    default:
      throw new Error("Ops! something went wrong");
  }
}