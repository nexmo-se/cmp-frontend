import { useContext } from "react";
import { UserContext } from "contexts/user";

export default function useUser () {
  return useContext(UserContext);
}