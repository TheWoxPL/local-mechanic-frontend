import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../config/firebaseConfig';
export class AuthService {
  static async googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  static async logout() {
    const authInstance = getAuth();
    await signOut(authInstance).catch((error) => {
      console.log('error:', error);
    });
  }

  static async getToken() {
    const authInstance = getAuth();
    return await authInstance.currentUser?.getIdToken();
  }

  static async registerWithEmailAndPasswordFirebase(
    email: string,
    password: string
  ) {
    const authInstance = getAuth();
    return await createUserWithEmailAndPassword(authInstance, email, password);
  }

  static async loginWithEmailAndPasswordFirebase(
    email: string,
    password: string
  ) {
    const authInstance = getAuth();
    return await signInWithEmailAndPassword(authInstance, email, password);
  }
}
