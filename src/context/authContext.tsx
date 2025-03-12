import { createContext, useState } from 'react';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const isUserLogged = () => {
    return user !== null ? true : false;
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isUserLogged, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
