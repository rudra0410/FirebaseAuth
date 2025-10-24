import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthUser } from '../services/authService';
import {
  getUserFromStorage,
  removeUserFromStorage,
  saveUserToStorage,
} from '../services/storageService';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // restore user from storage on app start
  useEffect(() => {
    const restoreUser = async () => {
      const storedUser = await getUserFromStorage();
      if (storedUser) setUser(storedUser);
      setLoading(false);
    };
    restoreUser();
  }, []);

  // observe auth state changes
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(getAuth(), async firebaseUser => {
      if (firebaseUser) {
        const userData: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
        };
        setUser(userData);
        await saveUserToStorage(userData);
      } else {
        setUser(null);
        await removeUserFromStorage();
      }
    });
    return unSubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
