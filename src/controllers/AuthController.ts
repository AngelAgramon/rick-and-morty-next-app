import { AuthApi } from '~/services';
import { AuthModel } from '../models/AuthModel';
import { makeAutoObservable } from 'mobx';
import { observable } from 'mobx';

class AuthController {
  userName: string | null = null;
  // authError: string | null = null;
  isAuthenticated = false;
  authToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get getUserName() {
    return this.userName;
  } 

  get getIsLoggedIn() {
    return this.userName !== null;
  }



  initialize(){
    this.userName = null
    this.isAuthenticated = false
    this.authToken = null
    // this.authError = null
    // this.isAuthenticated = false
    // this.authToken = null
  }

  initializeAuth() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.isAuthenticated = true;
        this.authToken = token;
      }
    }
  }

  setAuthenticated(isAuth: boolean, token?: string) {
    this.isAuthenticated = isAuth;
    this.authToken = token || null;
  }
  
  async login(username: string, password: string): Promise<boolean> {
    
    try {
      const api = new AuthApi();
      const response = await api.simulateLogin(username, password);
      if (response.success && response.token) {
        localStorage.setItem('authToken', response.token);
        this.setAuthenticated(true, response.token);
        this.userName = username
        return true;
      } else {
        this.setAuthenticated(false);
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  logout() {
    localStorage.removeItem('authToken');
    this.initializeAuth();
  }
}
const authController = new AuthController();
export { authController };