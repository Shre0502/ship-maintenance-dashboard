import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtils';

const AuthContext = createContext();

const defaultUsers = [
  { id: '1', role: 'Admin', email: 'admin@entnt.in', password: 'admin123' },
  { id: '2', role: 'Inspector', email: 'inspector@entnt.in', password: 'inspect123' },
  { id: '3', role: 'Engineer', email: 'engineer@entnt.in', password: 'engine123' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const existingUsers = getFromLocalStorage('users');
    if (!existingUsers) saveToLocalStorage('users', defaultUsers);

    const session = getFromLocalStorage('session');
    if (session) setUser(session);
  }, []);

  const login = (email, password) => {
    const users = getFromLocalStorage('users') || [];
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      saveToLocalStorage('session', found);
      setUser(found);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    localStorage.removeItem('session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
