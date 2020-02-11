import React from "react";

import CustomError from "entities/error";

export const UserContext = React.createContext();
export default function UserProvider({ children }){
  const [ token, setToken ] = React.useState(null);

  async function login(l){
    const url = `${process.env.REACT_APP_BASE_API_URL}/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(l.toJSON())
    });

    if(response.status !== 200) throw new CustomError("login/err", `Error status: ${response.status}`);

    const { token } = await response.json();
    setToken(token);
  }

  const value = { token, login }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}