import firebase from '@react-native-firebase/app';

let app: firebase.app.App | null = null;

export const getFirebaseApp = (): firebase.app.App | null => {
  if (!app) {
    app = firebase.app();
  }
  return app;
};
