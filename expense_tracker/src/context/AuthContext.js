import { createContext, useContext, useState } from 'react';
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};