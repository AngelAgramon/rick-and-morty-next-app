import { AuthApiClient } from '../services';
import { makeAutoObservable } from 'mobx';

class AuthController {
  _userName: string | null = null;
  _token: string | null = null;
  private _authApi: AuthApiClient | null = null;

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
    const result = this._userName !== null && this._token !== null;

    if (!result) {
      this._userName = null;
      this._token = null;
    } 

    return result;
  }

  get token() {
    return this._token;
  }

  private getAuthApi(): AuthApiClient {
    if (!this._authApi) {
      this._authApi = new AuthApiClient();
    }
    return this._authApi;
  }

  login = async (username: string, password: string): Promise<boolean> => {
    try {
      const api = this.getAuthApi();
      const response = await api.simulateLogin(username, password);
      if (response.success && response.token) {
        this.userName = username;
        this._token = response.token;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error)
      return false;
    }
  };

  validateRoute = (): boolean => {
    return this.isAuthenticated;
  }

  logout = (): void => {
    this._token = null;
    this.userName = null;
    if (this._authApi) {
      this._authApi = null;
    }
  }

  cleanup = (): void => {
    this._token = null;
    this.userName = null;
    this._authApi = null;
  }
}
const authController = new AuthController();
export { authController };
