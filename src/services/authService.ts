import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
} from 'firebase/auth';

import { auth } from '../config/firebaseConfig';
import ApiUtils from 'src/shared/api/apiUtils';

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    const response = await ApiUtils.auth.verifyToken();
    return response;
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const logout = async () => {
  const auth = getAuth();
  await signOut(auth).catch((error) => {
    console.log('error:', error);
  });
};

export const getToken = async () => {
  const auth = getAuth();
  return await auth.currentUser?.getIdToken();
};