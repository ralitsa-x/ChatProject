import { Navigate, Outlet } from "react-router-dom";
import { useIdentityContext } from "../utils/UseIdentitycontext";

export default function AuthGuard({ children }) {
  const { isLogged } = useIdentityContext();

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}