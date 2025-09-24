import { makeAutoObservable } from 'mobx';
import { ModalProps, UserResponse, User } from '../types';
import { UserApi } from '~/services';
import { characterModel } from '~/models';


class UserController {
    _isUsersModalOpen = false
    _users: User[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    initialize =  () => {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        const userApi = new UserApi();
        const response = await userApi.getUsers();
        this._users = response.users;
    }

    get users () {
        return this._users;
    }
}

const userController = new UserController();
export { userController };