import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/" />; 
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/list" />;

  return children;
};

export default ProtectedRoute;
