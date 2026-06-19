import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  // @ts-expect-error - the function exists but is not typed in the Firebase SDK
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyBJLa3A4PjVjzfV_nrBxUlaxVvuV4FaXl4',
  authDomain: 'fotogram-3d0d5.firebaseapp.com',
  projectId: 'fotogram-3d0d5',
  storageBucket: 'fotogram-3d0d5.firebasestorage.app',
  messagingSenderId: '289356542078',
  appId: '1:289356542078:web:578d474fd6e68e51a3682f',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let authInstance: Auth;

if (Platform.OS === 'web') {
  authInstance = getAuth(app);
} else {
  try {
    authInstance = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    authInstance = getAuth(app);
  }
}

export const auth = authInstance;
export const db = getFirestore(app);
export const storage = getStorage(app);