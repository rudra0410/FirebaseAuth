import { Alert } from 'react-native';

export const handleFirebaseError = (error: any) => {
  let message = 'Something went wrong. Please try again.';

  if (error.code) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'This email is already registered.';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email format.';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password.';
        break;
      case 'auth/user-not-found':
        message = 'No account found with this email.';
        break;
      case 'auth/too-many-requests':
        message = 'Too many attempts. Try again later.';
        break;
      default:
        message = error.message || message;
    }
  }

  Alert.alert('Error', message);
};
