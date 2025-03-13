import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
} from 'firebase/auth';

import { auth } from '../config/firebaseConfig';
import ApiUtils from 'src/shared/api/apiUtils';
import { ResponseTokenDTO } from 'src/shared/dtos';

export class AuthService {
  private static currentUser: ResponseTokenDTO | null =
    AuthService.loadUserFromStorage();

  static async googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      const response = await ApiUtils.auth.verifyToken();
      AuthService.currentUser = response;
      localStorage.setItem('currentUser', JSON.stringify(response)); // Save to LS
      window.dispatchEvent(new Event('authChanged')); // Notify all listeners
      return response;
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  static async logout() {
    const authInstance = getAuth();
    await signOut(authInstance).catch((error) => {
      console.log('error:', error);
    });
    AuthService.currentUser = null;
    localStorage.removeItem('currentUser'); // Clear from LS// Notify all listeners
  }

  static async getToken() {
    const authInstance = getAuth();
    return await authInstance.currentUser?.getIdToken();
  }

  static getCurrentUser(): ResponseTokenDTO | null {
    return AuthService.currentUser;
  }

  private static loadUserFromStorage() {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  static isUserLogged(): boolean {
    return AuthService.currentUser !== null;
  }
}
