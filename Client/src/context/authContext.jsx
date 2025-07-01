import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  const [name, setName] = useState(localStorage.getItem('name') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('name', name);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.clear();
    }
  }, [token, role, name]);

  const login = (token, role, name) => {
    setToken(token);
    setRole(role);
    setName(name)
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setName(null)
  };

  return (
    <AuthContext.Provider value={{ token, role, name, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
