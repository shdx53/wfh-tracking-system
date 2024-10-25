// Library
import { createContext, useContext } from "react";

const LoginContext = createContext();

export function LoginProvider({ children, loginData }) {
  return (
    <LoginContext.Provider value={loginData}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}
