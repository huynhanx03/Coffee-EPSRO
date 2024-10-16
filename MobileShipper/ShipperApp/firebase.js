// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const {
  EXPO_PUBLIC_API_KEY,
  EXPO_PUBLIC_AUTH_DOMAIN,
  EXPO_PUBLIC_DATABASE_URL,
  EXPO_PUBLIC_PROJECT_ID,
  EXPO_PUBLIC_STORAGE_BUCKET,
  EXPO_PUBLIC_MESSAGING_SENDER_ID,
  EXPO_PUBLIC_APP_ID,
  EXPO_PUBLIC_MEASUREMENT_ID
} = process.env

const firebaseConfig = {
  apiKey: EXPO_PUBLIC_API_KEY,
  authDomain: EXPO_PUBLIC_AUTH_DOMAIN,
  databaseURL: EXPO_PUBLIC_DATABASE_URL,
  projectId: EXPO_PUBLIC_PROJECT_ID,
  storageBucket: EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: EXPO_PUBLIC_APP_ID,
  measurementId: EXPO_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);