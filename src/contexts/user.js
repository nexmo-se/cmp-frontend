import React from "react";
import jwt from "jsonwebtoken";

import CustomError from "entities/error";
import FetchAPI from "api/fetch";

export const UserContext = React.createContext();
export default function UserProvider({ children }){
  const [ token, setToken ] = React.useState(localStorage.getItem("token"));
  const [ isAuthenticated, setIsAuthenticated ] = React.useState(false);
  const [ fullName, setFullName ] = React.useState("");

  async function login(l){
    const url = `${process.env.REACT_APP_BASE_API_URL}/auth/login`;
    const { token } = await FetchAPI.post(url, token, JSON.stringify(l.toJSON()));
    localStorage.setItem("token", token);
    setToken(token);
  }

  async function getMyInfo(){
    const url = `${process.env.REACT_APP_BASE_API_URL}/users/me`;
    const { firstName, lastName } = await FetchAPI.get(url, token);
    setFullName(`${firstName} ${lastName}`)
  }

  React.useEffect(() => {
    if(token){
      setIsAuthenticated(true);
    }else setIsAuthenticated(false);
  }, [ token ])

  const value = { 
    fullName,
    token, 
    login, 
    isAuthenticated, 
    getMyInfo 
  }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}