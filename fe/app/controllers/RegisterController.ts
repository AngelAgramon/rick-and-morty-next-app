import { makeAutoObservable } from 'mobx';
import { RegisterApi } from '~/services';

class RegisterController { 
    userName: string | null = null;
    password: string | null = null;
    private _registerApi: RegisterApi | null = null;
  constructor() {
    makeAutoObservable(this)
  }
    
  public getRegisterApi(): RegisterApi {
    if (!this._registerApi) {
      this._registerApi = new RegisterApi();
    }
    return this._registerApi;
  }
  register = async (username: string, password: string): Promise<boolean> => {
    try {
      const api = this.getRegisterApi();
      const response = await api.simulateRegister(username, password);
      if (response.success) {
        this.userName = username;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error)
      return false;
    }
  };

}
const registerController = new RegisterController();
export { registerController };
