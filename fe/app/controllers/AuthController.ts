import { AuthApi } from '../services';
import { AuthModel } from '../models/AuthModel';
import { action, makeAutoObservable, makeObservable } from 'mobx';
import { observable } from 'mobx';

class AuthController {
  _userName: string | null = null;
  _isAuthenticated = false;

  constructor() {
    makeAutoObservable(this)
  }

  get userName() {
    return this._userName;
  } 

  get isLoggedIn() {
    return this._userName !== null;
  }

  set userName (userName: string  | null) {
    this._userName = userName;
  }

  initialize = () => {
    this._userName = null
    this._isAuthenticated = false
  }

  login = async (username: string, password: string): Promise<boolean> => {
    try {
      const api = new AuthApi();
      const response = await api.simulateLogin(username, password);
      if (response.success && response.token) {
        localStorage.setItem('authToken', response.token);
        this.userName = username;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error)
      return false;
    }
  };

  checkAuthAndNavigate = (navigate: (path: string) => void) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (!this.isLoggedIn && !token) {
        navigate('/'); 
      }
    }
  };

  logout = () => {
    localStorage.removeItem('authToken');
    this.userName = null;
  }
}
const authController = new AuthController();
export { authController };