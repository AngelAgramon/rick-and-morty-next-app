import { AuthApi } from '~/services';
import { AuthModel } from '../models/AuthModel';
import { action, makeAutoObservable, makeObservable } from 'mobx';
import { observable } from 'mobx';

class AuthController {
  userName: string | null = null;
  // authError: string | null = null;
  isAuthenticated = false;
  // authToken: string | null = null;

  constructor() {
    // makeObservable(this, 
    //   {
    //     isAuthenticated: observable,
    //     authToken: observable,
    //     userName: observable,
    //     setAuthenticated: action

    //   }
    // );
    makeAutoObservable(this)
  }

  get getUserName() {
    return this.userName;
  } 

  get getIsLoggedIn() {
    return this.userName !== null;
  }

  set setUserName(userName: string){
    this.userName = userName
  }

  initialize(){
    this.userName = null
    this.isAuthenticated = false
    // this.authToken = null
    // this.authError = null
    // this.isAuthenticated = false
    // this.authToken = null
  }

  initializeAuth() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.isAuthenticated = true;
        // this.authToken = token;
      }
    }
  }

  setAuthenticated(isAuth: boolean, token?: string) {
    console.log(isAuth, token)
    this.isAuthenticated = isAuth;
    // this.authToken = token || null;
  }
  
  async login(username: string, password: string): Promise<boolean> {
    try {
      const api = new AuthApi();
      const response = await api.simulateLogin(username, password);
      console.log(response)
      debugger
      if (response.success && response.token) {
        localStorage.setItem('authToken', response.token);
        console.log(response.token)
        this.setUserName = username
        // this.setAuthenticated(true, response.token);
        console.log(username, "el que llega")
        // this.userName = username
        return true;
      } else {
        
        this.setAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.log(error)
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