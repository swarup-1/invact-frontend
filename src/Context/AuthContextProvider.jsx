import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [isAuth, setAuth] = useState(false);
  let initialState = { name: '', email: '', password: '' };
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    const storedIsAuth = localStorage.getItem('isAuth');
    const storedUser = localStorage.getItem('user');
    
    if (storedIsAuth) {
      setAuth(JSON.parse(storedIsAuth));
    }
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const login = (name, email, password) => {
    setAuth(true);
    setUser({ name, email, password });
    
    localStorage.setItem('isAuth', JSON.stringify(true));
    localStorage.setItem('user', JSON.stringify({ name, email, password }));
  };

  const logout = () => {
    setAuth(false);
    setUser(initialState);
    
    localStorage.removeItem('isAuth');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
