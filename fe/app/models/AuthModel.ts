import { makeAutoObservable } from "mobx";

class AuthModel {
  _userName: string | null = null;
  _token: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get userName() {
    return this._userName;
  }

  set userName(userName: string | null) {
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
  set token(token: string | null) {
    this._token = token;
  }
}
const authModel = new AuthModel();
export { authModel };
