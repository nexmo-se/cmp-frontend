import Config from "config";
import FetchAPI from "api/fetch";
import validator from "validator";
import { createContext } from "react";

import useSWR from "swr";
import { useState, useEffect } from "react";

interface UserContextProps {
  fullName: string;
  token?: string;
  login: (args: LoginOptions) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface UserProviderProps {
  children?: any;
}

interface LoginOptions {
  username: string;
  password: string;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

function UserProvider ({ children }: UserProviderProps) {
  const [token, setToken] = useState<string | undefined>(sessionStorage.getItem("token") ?? undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const { data } = useSWR(
    () => {
      if (!token) return null;
      return [`${Config.apiDomain}/users/me`, token]
    }
  )

  async function login ({ username, password }: LoginOptions) {
    const url = `${Config.apiDomain}/auth/login`;
    const body = JSON.stringify({ username, password })
    const { token } = await FetchAPI.post({ url, body });

    sessionStorage.setItem("token", token);
    setToken(token);
  }

  function logout () {
    sessionStorage.removeItem("token");
    setToken(undefined);
  }

  useEffect(
    () => {
      if (!data) return;
      if (data.code) return; // assuming if backend return code, it means error

      setFullName(`${data.firstName} ${data.lastName}`);
    },
    [data]
  )

  useEffect(
    () => {
      setIsAuthenticated(
        !validator.isEmpty(token ?? "") &&
        token !== undefined
      );
    },
    [token]
  )

  return (
    <UserContext.Provider
      value={{
        fullName,
        token,
        login,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;
