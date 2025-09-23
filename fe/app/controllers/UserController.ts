import { makeAutoObservable } from 'mobx';
import { ModalProps } from '../types';


class UserController {
    _isUsersModalOpen = false

    constructor() {
        makeAutoObservable(this);
    }

    getIsUsersModalOpen = () => {
        return this._isUsersModalOpen;
    }

    setIsUsersModalOpen =() => {
        console.log(this._isUsersModalOpen);
        this._isUsersModalOpen = !this._isUsersModalOpen;
        console.log(this._isUsersModalOpen);
    }
}

const userController = new UserController();
export { userController };