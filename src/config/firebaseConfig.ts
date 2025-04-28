import { initializeApp } from 'firebase/app';
import {
  browserSessionPersistence,
  connectAuthEmulator,
  getAuth,
  setPersistence,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_YOUR_API_KEY,
  authDomain: import.meta.env.VITE_APP_YOUR_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_YOUR_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_YOUR_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_OUR_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_YOUR_APP_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);
if (import.meta.env.VITE_APP_FIREBASE_EMULATOR === 'true') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export { auth };
