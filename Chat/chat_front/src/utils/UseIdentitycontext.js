import { useContext } from "react";
import { IdentityContext } from "../utils/IdentityContext";

export const useIdentityContext = () => {
  const context = useContext(IdentityContext);

  return context;
};