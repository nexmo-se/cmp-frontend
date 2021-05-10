import { ErrorContext } from "contexts/error";
import { useContext } from "react";

export default function useError(){
  return useContext(ErrorContext);
}