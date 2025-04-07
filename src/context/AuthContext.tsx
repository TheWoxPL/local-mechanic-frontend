import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config';
import { AuthService } from 'src/services/authService';
import ApiUtils from 'src/shared/api/apiUtils';

const AuthContext = createContext({
  user: null,
  roles: [],
  loadRoles: () => {},
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const login = async () => {
    await AuthService.googleLogin();
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    setRoles([]);
  };

  const loadRoles = async () => {
    const response = await ApiUtils.auth.getRoles();
    setRoles(response);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      ApiUtils.auth.getRoles().then((response) => {
        setRoles(response);
        setLoading(false);
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, roles, loadRoles, loading, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
