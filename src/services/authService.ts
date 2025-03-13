import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
} from 'firebase/auth';

import { auth } from '../config/firebaseConfig';
import ApiUtils from 'src/shared/api/apiUtils';

export class AuthService {
  static async googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      const response = await ApiUtils.auth.verifyToken();
      return response;
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  static async logout() {
    const auth = getAuth();
    await signOut(auth).catch((error) => {
      console.log('error:', error);
    });
  }

  static async getToken() {
    const auth = getAuth();
    return await auth.currentUser?.getIdToken();
  }
}
