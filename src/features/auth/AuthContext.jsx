

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const lastActiveTime = parseInt(localStorage.getItem("lastActiveTime"));
    const currentTime = new Date().getTime();

    if (storedUser && lastActiveTime) {
      if (currentTime - lastActiveTime > SESSION_TIMEOUT) {
        logout();
      } else {
        setUser(storedUser);
      }
    }
    setLoading(false); // After checking, set loading false
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("lastActiveTime", new Date().getTime().toString());
    }
  }, [user]);

  function login(username, password) {
    if (username === "admin" && password === "admin123") {
      const loggedInUser = { username, token: "mock-jwt-token-123456" };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("lastActiveTime", new Date().getTime().toString());
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("lastActiveTime");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
