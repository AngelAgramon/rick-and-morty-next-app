import { AuthApi } from '../services';
import { makeAutoObservable } from 'mobx';
import { useNavigate } from '@remix-run/react';

class AuthController {
  _userName: string | null = null;
  _token: string | null = null;

  constructor() {
    makeAutoObservable(this)
  }

  get userName() {
    return this._userName;
  } 

  set userName (userName: string  | null) {
    this._userName = userName;
  }

  get isAuthenticated() {
    // const token = localStorage.getItem('authToken');
    const result = this._userName !== null && this._token !== null;

    if (!result) {
      // localStorage.removeItem('authToken');
      this._userName = null;
      this._token = null;
    } 

    return result;
  }

  get token() {
    return this._token;
  }

  login = async (username: string, password: string): Promise<boolean> => {
    try {
      const api = new AuthApi();
      const response = await api.simulateLogin(username, password);
      if (response.success && response.token) {
        // localStorage.setItem('authToken', response.token);
        this.userName = username;
        this._token = response.token;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error)
      return false;
    }
  };

  validateRoute = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = this;

    if (!isAuthenticated) {
      navigate('/');
    }
  }

  logout = () => {
    const navigate = useNavigate();
    this._token = null;
    this.userName = null;
    navigate('/');
  }
}
const authController = new AuthController();
export { authController };