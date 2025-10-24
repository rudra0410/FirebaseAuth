import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthUser } from './authService';

const USER_KEY = '@firebase_user';

export const saveUserToStorage = async (user: AuthUser): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error('Error in saving user', err);
    return;
  }
};

export const getUserFromStorage = async (): Promise<AuthUser | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (err) {
    console.error('Error in getting user', err);
    return null;
  }
};

export const removeUserFromStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (err) {
    console.error('Error in removing user', err);
    return;
  }
};

