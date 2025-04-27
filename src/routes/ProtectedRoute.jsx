import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
  return children;
}

export default ProtectedRoute;
