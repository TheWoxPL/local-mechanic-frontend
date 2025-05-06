import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config';
import { AuthService } from 'src/services/authService';
import ApiUtils from 'src/shared/api/apiUtils';

interface AuthContextType {
  user: User | null;
  roles: string[];
  loadRoles: () => void;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  registerWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  roles: [],
  loadRoles: () => {},
  loading: true,
  login: async () => {},
  logout: async () => {},
  registerWithEmailAndPassword: async () => {},
  loginWithEmailAndPassword: async () => {},
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

  const registerWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    await AuthService.registerWithEmailAndPasswordFirebase(email, password);
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    await AuthService.loginWithEmailAndPasswordFirebase(email, password);
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
      value={{
        user,
        roles,
        loadRoles,
        loading,
        logout,
        login,
        registerWithEmailAndPassword,
        loginWithEmailAndPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
