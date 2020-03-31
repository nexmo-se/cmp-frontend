import React from "react";
import jwt from "jsonwebtoken";

import CustomError from "entities/error";

export const UserContext = React.createContext();
export default function UserProvider({ children }){
  const [ token, setToken ] = React.useState(localStorage.getItem("token"));
  const [ isAuthenticated, setIsAuthenticated ] = React.useState(false);

  async function login(l){
    const url = `${process.env.REACT_APP_BASE_API_URL}/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(l.toJSON())
    });

    if(response.status !== 200) throw new CustomError("login/err", `Error status: ${response.status}`);

    const { token } = await response.json();
    localStorage.setItem("token", token);
    setToken(token);
  }

  React.useEffect(() => {
    if(token){
      const decoded = jwt.decode(token);
      setIsAuthenticated(true);
    }else setIsAuthenticated(false);
  }, [ token ])

  const value = { token, login, isAuthenticated }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}