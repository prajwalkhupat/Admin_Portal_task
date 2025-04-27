import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import Dashboard from "./features/dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./features/auth/AuthContext";
import ProductsPage from "./features/products/ProductsPage";
import AgentsPage from "./features/agents/AgentsPage";
import OrdersPage from "./features/orders/OrdersPage"
import Layout from "./features/dashboard/DashboardLayout";
import ErrorBoundary from "./features/errorBoundary/ErrorBoundary";

function App() {
  return (
    <AuthProvider>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
            <Layout>
              <ProductsPage />
            </Layout>  
            </ProtectedRoute>
          }
        />
        <Route
          path="/agents"
          element={
            <ProtectedRoute>
              <Layout>
                <AgentsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/orders"
          element={
            <ProtectedRoute>
              <Layout>
                <OrdersPage />
              </Layout>
            </ProtectedRoute>
          } 
        />

       
      </Routes>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
