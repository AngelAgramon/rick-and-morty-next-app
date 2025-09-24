import { Api } from "./api";
import { UserResponse } from '~/types';

export class UserApi extends Api {
    public constructor() {
        super();
    }

    public getUsers = async () => {
        const response = await this.get<UserResponse>('/users');
        return response.data;
    };
}
