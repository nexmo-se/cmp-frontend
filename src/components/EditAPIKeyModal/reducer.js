// @flow
type Props = {
  id:string,
  name:string,
  +apiKey:string,
  isClean:boolean
}

export const initialState:Props = {
  id: "",
  name: "",
  apiKey: "",
  isClean: false
}

export default function reducer(state:Props, action:any){
  const nameValid = !!state.name;

  switch(action.type){
    case "NAME_CHANGE":
      return Object.assign({}, state, { name: action.value });
    case "CHECK_CLEAN":
      return Object.assign({}, state, { isClean: nameValid });
    case "CLEAR_INPUT":
      return initialState;
    case "INITIAL_STATE":
      return Object.assign({}, state, {
        id: action.value.id,
        name: action.value.name,
        apiKey: action.value.apiKey,
        isClean: !!action.value.name
      })
    default:
      throw new Error("Ops! something went wrong");
  }
}