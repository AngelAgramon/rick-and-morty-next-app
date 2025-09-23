import { makeAutoObservable } from 'mobx';

class UserController {
    isUsersModalOpen: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    getIsUsersModalOpen = () => {
        return this.isUsersModalOpen;
    }

    setIsUsersModalOpen = (isUsersModalOpen: boolean) => {
        console.log("setIsUsersModalOpen", isUsersModalOpen);
        this.isUsersModalOpen = isUsersModalOpen;
    }
}

const userController = new UserController();
export { userController };