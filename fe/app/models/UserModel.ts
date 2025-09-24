import { User } from '../types';
import { makeAutoObservable } from 'mobx';

class UserModel {
    _users: User[] = [];
    _isError: boolean = false;
    _isLoading: boolean = false;
    _errorMessage: string = '';

    constructor() {
        makeAutoObservable(this);
    }   

    get users () {
        return this._users;
    }
    
    set users (users: User[]) {
        this._users = users;
    }

    get isError () {
        return this._isError;
    }
    
    set isError (isError: boolean) {
        this._isError = isError;
    }

    get isLoading () {
        return this._isLoading;
    }

    set isLoading (isLoading: boolean) {
        this._isLoading = isLoading;
    }

    get errorMessage () {
        return this._errorMessage;
    }

    set errorMessage (errorMessage: string) {
        this._errorMessage = errorMessage;
    }
}

const userModel = new UserModel();
export { userModel };
