
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar"; 

function Layout({ children }) {
  const { user } = useAuth();

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default Layout;
