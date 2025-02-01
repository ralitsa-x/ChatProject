import { createContext } from "react";
import { useLocalStorage } from "./UseLocalStorage";

export const IdentityContext = createContext();

export const IdentityProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("auth", null);

  const userLogin = (result) => {
    setUser(result.data);
  };

  return (
    <IdentityContext.Provider
      value={{
        user,
        userLogin,
        isLogged: !!user,
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
};