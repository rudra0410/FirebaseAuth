import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
} from '@react-native-firebase/auth';
import { removeUserFromStorage, saveUserToStorage } from './storageService';

export type AuthUser = {
  uid: string;
  email: string | null;
};

type signUpProps = {
  email: string;
  password: string;
};

export const signUp = async ({
  email,
  password,
}: signUpProps): Promise<AuthUser> => {
  const userCredentials = await createUserWithEmailAndPassword(
    getAuth(),
    email,
    password,
  );
  const user = {
    uid: userCredentials.user.uid,
    email: userCredentials.user.email,
  };
  try {
    await saveUserToStorage(user);
  } catch (error) {
    console.error('Error saving user to storage in authService:', error);
  }
  return user;
};

type signInProps = {
  email: string;
  password: string;
};

export const signIn = async ({
  email,
  password,
}: signInProps): Promise<AuthUser> => {
  const userCredentials = await signInWithEmailAndPassword(
    getAuth(),
    email,
    password,
  );
  const user = {
    uid: userCredentials.user.uid,
    email: userCredentials.user.email,
  };
  try {
    await saveUserToStorage(user);
  } catch (error) {
    console.error('Error saving user to storage in authService:', error);
  }
  return user;
};

export const signOut = async (): Promise<void> => {
  await signOutFirebase(getAuth());
  await removeUserFromStorage();
};

export const getcurrentUser = (): AuthUser | null => {
  const user = getAuth().currentUser;
  return user ? { uid: user.uid, email: user.email } : null;
};

type observeAuthState = {
  callback: (user: AuthUser | null) => void;
};

export const observeAuthState = ({ callback }: observeAuthState) => {
  return onAuthStateChanged(getAuth(), user => {
    callback(user ? { uid: user.uid, email: user.email } : null);
  });
};
