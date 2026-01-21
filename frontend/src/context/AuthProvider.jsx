import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { loginUser } from "../api/auth.api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  // ✅ LOGIN (backend-aligned)
  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await loginUser(credentials);

      // 🔥 IMPORTANT: backend sends role separately
      // so we merge it into user object
      const userWithRole = {
        ...data.user,
        role: data.role,
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userWithRole));

      setToken(data.token);
      setUser(userWithRole);

      return { success: true, role: data.role };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
        role: user?.role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
