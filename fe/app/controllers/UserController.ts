import { makeAutoObservable } from 'mobx';
import { User } from '../types';
import { UserApiClient } from '~/services';
import { userModel } from '~/models';


class UserController {
    _users: User[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    initialize = () => {
        if (this._users.length === 0 && !userModel.isError && !userModel.isLoading) {
          this.fetchUsers();
        }
    }

    fetchUsers = async () => {
        try {
            userModel.isLoading = true;
            userModel.isError = false;

            const userApi = new UserApiClient();
            const response = await userApi.getUsers();
            console.log("response 1 FE fetchUsers: ", response);
            this._users = response.users;
            
        } catch (error) {
            //TODO: Search for a clean way to handle errors
            const errorMessage: any = error instanceof Error ? error.message : 'An unknown error occurred';

            userModel.isError = true;
            userModel.errorMessage = errorMessage;
        } finally {
            userModel.isLoading = false;
        }
    }

    get users () {
        return this._users;
    }
}

const userController = new UserController();
export { userController };