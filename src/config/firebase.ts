import firebase from '@react-native-firebase/app';

// Using `any` here to avoid namespace/type mismatches with the
// `@react-native-firebase/app` package typings in this project setup.
// This is a low-risk change that silences TS2503 errors and keeps
// runtime behavior the same. We can tighten the types later if needed.
let app: any = null;

export const getFirebaseApp = (): any => {
  if (!app) {
    app = firebase.app();
  }
  return app;
};
