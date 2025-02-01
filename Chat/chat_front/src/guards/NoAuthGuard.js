import { Navigate, Outlet } from "react-router-dom";
import { useIdentityContext } from "../utils/UseIdentitycontext"; 

export default function NoAuthGuard({ children }) {
  const { isLogged } = useIdentityContext();
  if (isLogged) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}